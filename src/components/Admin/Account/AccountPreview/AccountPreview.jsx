import React, {useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import bringNameOfEmail from './Firebase Querys/bringNameOfEmail';
import { withRouter } from 'react-router';

const AccountPreview = (props) => {

    const [login, setLogin] = useState(false)

    const [fullName, setFullName] = useState('')
    const [initials, setInitials] = useState('')

    const [fullNameDisplay, setFullNameDisplay] = useState(false)

    const defineName = async (email) => {

        let name = await bringNameOfEmail(email)
            name = name.name
   
        if (name) {

            setFullName(name)

            let displayName = await name.split(' ')
            displayName = await displayName.map(string => string[0])
            
            setInitials(displayName)
        }
    }

    React.useEffect(() => {

        if (!login) {
            
            const auth = getAuth()
            
            onAuthStateChanged(auth, (user) => {
                
                if (user) {
                    defineName(user.email)
                    setLogin(true)
                } else {
                    props.history.push('/identify')
                }
            })   
        }
    }, [])
    
    return (
        <>
            {
                initials ?
                    <div className="account-preview">
                        <div
                            className={initials.length > 2 ? "initials inclusive" : "initials"}
                            onMouseEnter={() => setFullNameDisplay(true)}
                            onMouseLeave={() => setFullNameDisplay(false)}

                            onClick={() => props.history.push('/my-account')}
                        >
                            <p>{initials}</p>
                        </div>
                        <div
                            className={fullNameDisplay ? "full-name show" : "full-name"}>
                            <p>{fullName}</p>
                        </div>
                    </div>
                : null
            }
        </>

    )
}

export default withRouter(AccountPreview)
