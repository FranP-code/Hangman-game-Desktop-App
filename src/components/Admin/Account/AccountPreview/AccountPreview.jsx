import React, {useState} from 'react'
import bringNameOfEmail from './Firebase Querys/bringNameOfEmail';
import { withRouter } from 'react-router';
import { useContext } from 'react';
import UserDataContext from '../../../../contexts/UserDataContext';

const AccountPreview = (props) => {

    const context = useContext(UserDataContext)

    const [fullName, setFullName] = useState('')
    const [initials, setInitials] = useState('')

    const [fullNameDisplay, setFullNameDisplay] = useState(false)

    React.useEffect(() => {

        if (context.userData.data) {

            defineName()
        }
    }, [])

    const defineName = async () => {

        let name = context.userData.data.username
        console.log(name);
        console.log(context);
   
        if (name) {

            setFullName(name)

            let displayName = await name.split(' ')
            displayName = await displayName.map(string => string[0].toUpperCase())
            
            setInitials(displayName)
        }
    }

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
