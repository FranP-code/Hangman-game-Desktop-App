import React, { useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"


import capitalize from '../../Control Panel/Scripts/Capilazate'
import bringDataFromFirebase from './Firebase Querys/bringDataFromFirebase'
import HeaderAccount from './HeaderAccount/HeaderAccount'
import hideRefferCode from './Scripts/hideRefferCode'
import Loading from '../../../Loading/Loading'
import { withRouter } from 'react-router'

const AccountInfo = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState(false)
    const [position, setPosition] = useState('')

    const [refferCode, setRefferCode] = useState('')
    const [refferCodeHide, setRefferCodeHide] = useState(true)

    const [loading, setLoading] = useState(true)

    const closeSession = async () => {

        const auth = getAuth()

        signOut(auth)
            .then(() => {
                props.history.push('/identify')
        })
    }

    const applyResult = (result) => {

        setName(result['name'])
        setPosition(result['position'])
        setRefferCode(result['refferCode'])
    }

    const bringData = async (email) => {

        const result = await bringDataFromFirebase(email)

        await applyResult(await result)

        setLoading(false)
    }

    React.useEffect(() => {

        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {

            if (user) {
                setEmail(user.email)
                bringData(user.email)
            } else {

                props.history.push('/identify')
            }
        })        

    }, [])

    return (
        <>
            <HeaderAccount name={'Fran'} />

            
            <div className="info-account">

            {
                loading ? 
                    <Loading />
                :
                    <>
                        <div className="person">
                            <h2>{name}</h2>
                            <h3>{capitalize(position)}</h3>
                            <h3>Email: {email}</h3>
                        </div>
                        
                        <div className="functions">

                            <button
                                onClick={() => closeSession()}
                                className="close-session"
                            >
                                Close Session
                            </button>


                            <div className="reffer-code-container">

                                <p>Reffer Code: {refferCodeHide ? hideRefferCode(refferCode) : refferCode}</p>

                                <button
                                    onClick={() => setRefferCodeHide(!refferCodeHide)}
                                >
                                    👁️
                                </button>
                            </div>
                        </div>
                    </>
            }
            </div>

        </>
        
    )
}

export default withRouter(AccountInfo)
