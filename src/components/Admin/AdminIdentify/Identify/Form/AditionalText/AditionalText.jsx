import React from 'react'
import { withRouter } from 'react-router'

const AditionalText = (props) => {
    
    return (
        <p
            className="aditional-text"
            onClick={() => props.history.push(props.link)}>
          {props.text}  
        </p>
    )
}

export default withRouter(AditionalText)
