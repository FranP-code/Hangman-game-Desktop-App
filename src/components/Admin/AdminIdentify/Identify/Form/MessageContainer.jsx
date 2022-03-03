import React from 'react'

const MessageContainer = (props) => {
    return (
        <div className="message-container">
            <h2>{props.message}</h2>
        </div>
    )
}

export default MessageContainer
