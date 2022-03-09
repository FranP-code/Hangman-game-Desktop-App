import React from 'react'
import Form from './Form/Form'
import {withRouter} from 'react-router'


const Identify = ({setUserData}) => {

    return (
        <Form setUserData={setUserData}/>
    )
}


export default withRouter(Identify)
