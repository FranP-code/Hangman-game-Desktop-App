import React from 'react'
import {withRouter} from 'react-router'
import AccountPreview from '../Account/AccountPreview/AccountPreview'

const AdminHeader = (props) => {
    return (
        <header className={props.demo === true ? 'demo' : null}>
            {
                props.demo === true ? <h1>Admin Place&nbsp;<span className='demoSpan'>Demo!</span></h1> : <h1>Admin Place</h1>
            }
            <button
                className="redirect-button"
                onClick={() => props.history.push('/')}    
            >
                Back to the Game
            </button>

            {
                !props.demo ?
                    <AccountPreview />
                : null
            }
        </header>
    )
}

export default withRouter(AdminHeader)
