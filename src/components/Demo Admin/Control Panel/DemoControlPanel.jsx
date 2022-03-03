import React from 'react'
import AdminFunctionButton from '../../Admin/Control Panel/AdminFunctionButton'
import AdminHeader from '../../Admin/Header/AdminHeader'
import ActionsDemo from './ActionsDemo/ActionsDemo'

const DemoControlPanel = () => {

    const [actualAction, setActualAction] = React.useState('')

    return (
        <>
            <AdminHeader demo={true} />

            <div className="control-panel">     
                <div 
                    className={actualAction ? 'buttons-container nav-mode' : 'buttons-container'}>
                        <AdminFunctionButton action={'Add Word(s)'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action={'Add Category'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action ={'Delete Category'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action ={'Delete Word'} actualAction={actualAction} setActualAction={setActualAction}/>
                        <AdminFunctionButton action ={'Edit Word'} actualAction={actualAction} setActualAction={setActualAction}/>
                </div>
                {
                    actualAction ?
                        <ActionsDemo actualAction={actualAction}/>
                    : null
                }
            </div>
        </>
    )
}

export default DemoControlPanel
