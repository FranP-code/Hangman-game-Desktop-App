import React, {useState} from 'react'
import DemoMessageLogic from './DemoMessageLogic'

const DemoMessage = ({setMessage}) => {

    const [show, setShow] = useState(true)

    React.useEffect(() => {

        setTimeout(() => {

            setShow(false)

        }, 3000)

        setTimeout(() => {

            setMessage(false)

        }, 3500)

    }, [])

    return (
        <div className="demo-message-container">
            <div className={show ? 'demo-message animate__animated animate__backInUp' : 'demo-message animate__animated animate__backOutDown'}>
                <h2>You aren't logged 🤦‍♂️</h2>
                <p>Thanks for the interest, but you need log in for modify the database</p>
            </div>
        </div>
    )
}

export default DemoMessage
