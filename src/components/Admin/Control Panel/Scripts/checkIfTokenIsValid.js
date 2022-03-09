const checkIfTokenIsValid = async (userData, setUserLogged) => {
    
    const { ipcRenderer } = window.require('electron')
    
    const ipcArgs = JSON.stringify(userData)

    ipcRenderer.send('users-check-token', ipcArgs)

    return ipcRenderer.once('users-check-token-reply', (event, arg) => {
        if (arg.status === 'success') {
            setUserLogged(true)
        }
    })  
}

export default checkIfTokenIsValid