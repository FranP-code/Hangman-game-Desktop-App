import React, {useState, useRef, useContext} from 'react'
import capitalize from '../../Scripts/Capilazate'
import Toast from '../../../Toast/Toast'
import UserDataContext from '../../../../../contexts/UserDataContext'

const { ipcRenderer } = window.require('electron')

const AddCategory = () => {

    const context = useContext(UserDataContext)

    const [languageList, setLanguageList] = useState([])
    
    const languageInput = useRef('')
    const categoryInput = useRef('')
    const firstWord = useRef('')

    const addCategorySubmit = async (e) => {
        e.preventDefault()

        const ipcArgs = JSON.stringify({
            language: languageInput.current.value,
            category: categoryInput.current.value,
            firstWord: firstWord.current.value,
            userData: context.userData
        })

        ipcRenderer.send('hangman-words-querys-add-category', ipcArgs)
        ipcRenderer.once('hangman-words-querys-add-category-reply', (event, arg) => {
            Toast(arg.status, arg.message)
        })
    }

    React.useEffect(() => {

        ipcRenderer.send('hangman-words-querys-get-languages')

        ipcRenderer.once('hangman-words-querys-get-languages-reply', (event, arg) => {
            
            languageInput.current.value = ''
            categoryInput.current.value = ''
            firstWord.current.value = ''
            
            setLanguageList(arg)
        })
    }, [])

    return (
        <div className="action-form add-category">
            <form
                onSubmit={e => addCategorySubmit(e)}
            >
                <select ref={languageInput}>
                    <option value="" selected>Select language</option>
                    {
                        languageList.map(language => (
                            <option value={language}>
                                {capitalize(language)}
                            </option>
                        ))
                    }
                </select>
                <input type="text" placeholder="Category" ref={categoryInput}/>
                <input type="text" placeholder="First word on category" ref={firstWord}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddCategory
