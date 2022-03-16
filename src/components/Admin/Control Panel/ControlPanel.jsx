import React, { useContext } from "react";
import AdminFunctionButton from "./AdminFunctionButton";
import {withRouter} from 'react-router'
import Actions from "./Actions/Actions";
import AdminHeader from "../Header/AdminHeader";
import checkIfTokenIsValid from "./Scripts/checkIfTokenIsValid";
import UserDataContext from "../../../contexts/UserDataContext";

const ControlPanel = ({demo}) => {

    const context = useContext(UserDataContext)

    const [actualAction, setActualAction] = React.useState('')
    const [userLogged, setUserLogged] = React.useState(false)

    const functions  = [
        'Add Word',
        'Add Category',
        'Delete Category',
        'Delete Word',
        'Edit Word',
        'Add Language'
    ]

    async function checkUserLogged() {
        await checkIfTokenIsValid(context.userData, setUserLogged)
    }

    React.useEffect(() => {
        checkUserLogged()
    }, [])
    return (
        <>
            <AdminHeader demo={demo}/>
            <div className="control-panel">
                <div 
                    className={actualAction ? 'buttons-container nav-mode' : 'buttons-container'}>
                        {
                            functions.map(individualFunction => (
                                <AdminFunctionButton action={individualFunction} actualAction={actualAction} setActualAction={setActualAction}/>
                            ))
                        }
                        {/* <AdminFunctionButton action={'Add Category'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action={'Delete Category'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action={'Delete Word'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action={'Edit Word'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action={'Add Language'} actualAction={actualAction} setActualAction={setActualAction}/> */}
                        {/* what the well i wrote... */}
                </div>
                {
                    actualAction ?
                        <Actions actualAction={actualAction} demo={demo}/>
                    : null
                }
            </div>
        </>
    )
}

export default withRouter(ControlPanel)