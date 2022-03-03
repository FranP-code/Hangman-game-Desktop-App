import React from 'react'
import DefineClassName from './Actions/Scripts/DefineClassName'

const AdminFunctionButton = ({action, actualAction, setActualAction}) => {
  
    const classButton = DefineClassName(action)

    return (
        <button
            className={action === actualAction ? classButton + ' active' : classButton}
            onClick={() => setActualAction(action)}
        >
            {action}
        </button>
    )
}

export default AdminFunctionButton
