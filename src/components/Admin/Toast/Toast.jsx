import React from 'react'
import { toast } from 'react-toastify';

const Toast = (status, message) => {
  return (
    toast[status](message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
  )
}

export default Toast