import React from 'react'
import AdminHeader from '../Header/AdminHeader'
import Identify from './Identify/Identify'

const AdminIdentify = ({setUserData}) => {
    return (
        <>
            <AdminHeader />
            <Identify setUserData={setUserData}/>
        </>
    )
}

export default AdminIdentify
