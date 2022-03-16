import React, { useContext } from 'react'
import { useRef } from 'react'
import UserDataContext from '../../../../../contexts/UserDataContext'
import Toast from '../../../Toast/Toast'

const { ipcRenderer } = window.require('electron')

const AddLanguage = ({demo}) => {

    const context = useContext(UserDataContext)

    const languageInput = useRef('')

    function submitForm(e) {
        e.preventDefault()
        
        if (demo) {

            Toast('info', 'You must to be logged for run that function')
            return
        }

        const language = languageInput.current.value.toLowerCase()

        const ipcArgs = JSON.stringify({
            language,
            userData: context.userData
        })

        ipcRenderer.send('hangman-words-querys-add-language', ipcArgs)
        ipcRenderer.once('hangman-words-querys-add-language-reply', (event, arg) => {
            Toast(arg.status, arg.message)
        })
    }

    return (
        <div className='action-form add-language'>
            <form onSubmit={e => submitForm(e)}>
                <input type="text" placeholder='New language to add' ref={languageInput}/>
                <input type="submit" />
            </form>    
        </div>
    )
}

export default AddLanguage