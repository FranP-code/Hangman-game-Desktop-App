import React, {useContext} from 'react'
import {withRouter} from 'react-router'
import AccountPreview from '../Account/AccountPreview/AccountPreview'
import UserDataContext from '../../../contexts/UserDataContext'

const AdminHeader = ({demo, history}) => {

    const context = useContext(UserDataContext)

    React.useEffect(() => {
        console.log(context)
    }, [])

    return (
        <header className={demo ? 'demo' : ''}>
            {
                demo ? <h1>Admin Place&nbsp;<span className='demoSpan'>Demo!</span></h1> : <h1>Admin Place</h1>
            }
            <button
                className="redirect-button"
                onClick={() => {
                    context.setUserData({})
                    history.push('/')}
                }
                   
            >
                Back to the Game
            </button>

            {
                !demo ?
                    <AccountPreview />
                : null
            }
        </header>
    )
}

export default withRouter(AdminHeader)
