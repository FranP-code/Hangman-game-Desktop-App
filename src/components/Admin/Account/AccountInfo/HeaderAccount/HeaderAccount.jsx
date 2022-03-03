import React from 'react'
import { withRouter } from 'react-router'

const HeaderAccount = (props) => {
    return (
        <header>
            <h1>My Account</h1>

            <button
                className="redirect-button"
                onClick={() => props.history.push('/admin-place')}    
            >
                Back to Admin Place
            </button>
        </header>
    )
}

export default withRouter(HeaderAccount)