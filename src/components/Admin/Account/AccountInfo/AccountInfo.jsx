import React, { useContext, useState } from 'react'
import capitalize from '../../Control Panel/Scripts/Capilazate'
import bringDataFromFirebase from './Firebase Querys/bringDataFromFirebase'
import HeaderAccount from './HeaderAccount/HeaderAccount'
import hideRefferCode from './Scripts/hideRefferCode'
import Loading from '../../../Loading/Loading'
import { withRouter } from 'react-router'
import UserDataContext from '../../../../contexts/UserDataContext'

const AccountInfo = (props) => {
    const context = useContext(UserDataContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState(false)
    const [position, setPosition] = useState('')

    const [refferCode, setRefferCode] = useState('')
    const [refferCodeHide, setRefferCodeHide] = useState(true)

    const [loading, setLoading] = useState(true)

    const applyResult = (result) => {
        console.log(result);
        setEmail(result.email)
        setName(result.username)
        setRefferCode(result.adminRefferCode)
    }

    const bringData = async (email) => {

        const result = context.userData.data

        applyResult(result)

        setLoading(false)
    }

    React.useEffect(() => {
        bringData()
    }, [])

    return (
        <>
            <HeaderAccount name={'Fran'} />
            <div className="info-account">       
                <div className="person">
                    <h2>{name}</h2>
                </div>
                
                <div className="functions">
                    <div className="reffer-code-container">

                        <p>Reffer Code: {refferCodeHide ? hideRefferCode(refferCode) : refferCode}</p>

                        <button
                            onClick={() => setRefferCodeHide(!refferCodeHide)}
                        >
                            👁️
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AccountInfo)
