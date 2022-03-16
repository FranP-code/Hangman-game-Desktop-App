import React, { useContext, useRef, useState } from 'react'
import UserDataContext from '../../../contexts/UserDataContext'
import capitalize from '../../../General Scripts/Capilazate'
import Toast from '../Toast/Toast'

const { ipcRenderer } = window.require('electron')

const CreateDatabaseForm = ({setActualPage}) => {
    
    const context = useContext(UserDataContext)

    const languageInput = useRef('')
    const categoryInput = useRef('')
    const firstWordInput = useRef('')

    const [databaseCreated, setDatabaseCreated] = useState(false)

    function submitForm(e) {

        if (databaseCreated) {
            return
        }
        e.preventDefault()

        let language = languageInput.current.value
        let category = categoryInput.current.value
        let firstWord = firstWordInput.current.value

        if (!language) {
            Toast('error', 'Fill the language please')
            return
        }

        if (!category) {
            Toast('error', 'Fill the category please')
            return
        }

        if (!firstWord) {
            Toast('error', 'Put at least one word in the textfield')
            return
        }
        
        language = language.toLowerCase()
        category = category.toLowerCase()

        function addLanguageToDatabase() {

            //Add language to database

            const ipcArgs = JSON.stringify({
                language,
                userData: context.userData
            })

            ipcRenderer.send('hangman-words-querys-add-language', ipcArgs)
            
            ipcRenderer.once('hangman-words-querys-add-language-reply', (event, arg) => {
                
                addCategoryToDatabase()
                
                // Toast(arg.status, arg.message)
            })
        }

        function addCategoryToDatabase() {

            //Add category to database

            const ipcArgs = JSON.stringify({
                category,
                language,
                firstWord,
                userData: context.userData
            })

            ipcRenderer.send('hangman-words-querys-add-category', ipcArgs)
            
            ipcRenderer.once('hangman-words-querys-add-category-reply', (event, arg) => {

                Toast("success", "Database created")
                setDatabaseCreated(true)
                
                setTimeout(() => {
                    setActualPage(8)
                }, 1000)
            })
        }

        addLanguageToDatabase()
    }
    
    return (
        <form onSubmit={(e) => submitForm(e)}>
            <input
                type="text"
                placeholder='Language'
                ref={languageInput}
            />
            <input
                type="text"
                placeholder='Category'
                ref={categoryInput}
            />
            <input
                type="text"
                placeholder="Add the first word of the category"
                ref={firstWordInput}
            />
            <input type="submit"/>
        </form>
    )
}

export default CreateDatabaseForm