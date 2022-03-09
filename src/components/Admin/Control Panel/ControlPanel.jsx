import React, { useContext } from "react";
import AdminFunctionButton from "./AdminFunctionButton";
import {withRouter} from 'react-router'
import Actions from "./Actions/Actions";
import AdminHeader from "../Header/AdminHeader";
import checkIfTokenIsValid from "./Scripts/checkIfTokenIsValid";
import UserDataContext from "../../../contexts/UserDataContext";

const ControlPanel = () => {

    const context = useContext(UserDataContext)

    const [actualAction, setActualAction] = React.useState('')
    const [userLogged, setUserLogged] = React.useState(false)

    async function checkUserLogged() {
        await checkIfTokenIsValid(context.userData, setUserLogged)
    }

    React.useEffect(() => {
        checkUserLogged()
    }, [])
    return (
        <>
            <AdminHeader />
            <div className="control-panel">
                {
                    userLogged ?
                        <div 
                            className={actualAction ? 'buttons-container nav-mode' : 'buttons-container'}>
                                <AdminFunctionButton action={'Add Word(s)'} actualAction={actualAction} setActualAction={setActualAction}/>
                                <AdminFunctionButton action={'Add Category'} actualAction={actualAction} setActualAction={setActualAction}/>
                                <AdminFunctionButton action ={'Delete Category'} actualAction={actualAction} setActualAction={setActualAction}/>
                                <AdminFunctionButton action ={'Delete Word'} actualAction={actualAction} setActualAction={setActualAction}/>
                                <AdminFunctionButton action ={'Edit Word'} actualAction={actualAction} setActualAction={setActualAction}/>
                        </div>
                    : null
                }
                {
                    actualAction ?
                        <Actions actualAction={actualAction}/>
                    : null
                }
            </div>
        </>
    )
}

export default withRouter(ControlPanel)