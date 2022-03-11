import React, {useState, useContext} from 'react'
import Loading from '../../../../Loading/Loading'
import Toast from '../../../Toast/Toast'
import capitalize from '../../Scripts/Capilazate'
import UserDataContext from '../../../../../contexts/UserDataContext'

const DeleteWord = () => {
    const { ipcRenderer } = window.require('electron')
    const context = useContext(UserDataContext)

    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [wordsList, setWordsList] = useState([])

    const [languageSelection, setLanguageSelection] = useState('')
    const [categorySelection, setCategorySelection] = useState('')
    const [wordSelection, setWordSelection] = useState('')

    const submitForm = async (e) => {

        e.preventDefault()
        //setLoading(true)

        if (languageSelection === '' || languageSelection === 'default') {
            Toast('error', 'Plase select one language')
            return
        }

        if (categorySelection === '' || categorySelection === 'default') {
            Toast('error', 'Plase select one category')
            return
        }

        if (wordSelection === '' || wordSelection === 'default') {
            Toast('error', 'Plase select one word')
            return
        }

        const ipcArgs = JSON.stringify({
            language: languageSelection,
            category: categorySelection,
            word: wordSelection,
            userData: context.userData
        })

        ipcRenderer.send('hangman-words-querys-delete-word', ipcArgs)
        ipcRenderer.once('hangman-words-querys-delete-word-reply', (event, arg) => {
            Toast(arg.status, arg.message)
            //setLoading(false)
        })
        
        setWordsList([])
        setLanguageSelection('')
        setCategorySelection('')
        setWordSelection('')
    }

    function getLanguages() {

        ipcRenderer.send('hangman-words-querys-get-languages')
        ipcRenderer.once('hangman-words-querys-get-languages-reply', (event, arg) => {
            setLanguageList(arg)
        })
    }

    function getCategories(language) {
        
        setCategorySelection('')
        setCategoryList([])
        setWordSelection('')
        setWordsList([])

        setLanguageSelection(language)
        
        if (!language || language === "default") {
            return
        }
        
        
        ipcRenderer.send('hangman-words-querys-get-categories', language)
        ipcRenderer.once('hangman-words-querys-get-categories-reply', (event, arg) => {
            setCategoryList(arg)
            //setLoading(false)
        })
    }

    function getWords(category) {
        setCategorySelection(category)
        setWordSelection('')
        setWordsList([])

        if (!category || category === "default") {
            return
        }

        const ipcArgs = JSON.stringify({
            language: languageSelection,
            category: category
        })

        ipcRenderer.send('hangman-words-querys-get-all-words-from-category', ipcArgs)
        ipcRenderer.once('hangman-words-querys-get-all-words-from-category-reply', (event, arg) => {
            setWordsList(arg)
            //setLoading(false)
        })
    }
    
    React.useEffect(() => {
        
        getLanguages()

    }, [])

    return (
        <>
            <div className="action-form delete-word">
                <form
                    onSubmit={(e) => submitForm(e)}
                >
                    {/* Language selection */}
                    <select
                        onChange={(e) => {
                            getCategories(e.target.value)
                        }}
                        value={languageSelection}
                    >
                        <option value="default">Select language</option>
                        {
                            languageList.map(language => <option key={language} value={language}>{capitalize(language)}</option>)
                        }
                    </select>
                    
                    {/* Category selection */}
                    <select
                        onChange={(e) => getWords(e.target.value)}
                        value={categorySelection}
                    >
                        <option value="default">Select category</option> 
                        {
                            categoryList.map(category => <option key={category.text} value={category.text}>{capitalize(category.text)}</option>)
                        }   
                    </select>

                    {/* Word selection */}
                    <select
                        onChange={(e) => setWordSelection(e.target.value)}
                        value={wordSelection}
                    >
                        <option value="default">Select word</option>
                        {
                            wordsList.map(word => <option key={word} value={word}>{capitalize(word)}</option>)
                        }
                    </select>
                    <input type="submit" value="Delete" />
                </form>
            </div>
        </>
    )
}

export default DeleteWord
