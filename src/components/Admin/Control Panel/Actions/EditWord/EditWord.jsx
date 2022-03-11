import React, {useState, useContext} from 'react'
import SendMeEmail from '../../Email/SendMeEmail'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import capitalize from '../../Scripts/Capilazate'
import BringLanguages from '../AddWord/Firebase Querys/BringLanguages'
import BringCategories from './Firebase Querys/BringCategories'
import BringWordsFromFirebase from './Firebase Querys/BringWordsFromFirebase'
import modifyWordInFirebase from './Firebase Querys/modifyWordInFirebase'
import UserDataContext from '../../../../../contexts/UserDataContext'
import Toast from '../../../Toast/Toast'

const EditWord = () => {
    const { ipcRenderer } = window.require('electron')
    const context = useContext(UserDataContext)

    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [wordsList, setWordsList] = useState([])

    const [languageSelection, setLanguageSelection]  = useState('default')
    const [categorySelection, setCategorySelection]  = useState('default')
    const [wordSelection, setWordSelection] = useState('default')

    const [newWord, setNewWord] = useState('')
    
    async function submitForm(e) {

        e.preventDefault()

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
            oldWord: wordSelection,
            newWord: newWord,
            userData: context.userData
        })

        ipcRenderer.send('hangman-words-querys-edit-word', ipcArgs)
        ipcRenderer.once('hangman-words-querys-edit-word-reply', (event, arg) => {
            Toast(arg.status, arg.message)
        })
        
        setWordsList([])
        setLanguageSelection('')
        setCategorySelection('')
        setWordSelection('')
        setNewWord('')
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
        <div className="action-form edit-word">
            <form
                onSubmit={e => submitForm(e)}
            >
                {/* Select language */}
                <select
                    onChange={e => getCategories(e.target.value)}
                    value={languageSelection}
                >
                    <option value="default">Select language</option>
                    {
                        languageList.map(language => 
                            <option value={language} key={language}>{capitalize(language)}</option>
                        )
                    }    
                </select>

                {/* Select category */}
                <select
                    onChange={e => getWords(e.target.value)}
                    value={categorySelection}
                >
                    <option value="default">Select category</option>
                    {
                        categoryList.map(category => 
                            <option value={category.text} key={category.text}>{capitalize(category.text)}</option>    
                        )
                    }    
                </select>

                {/* Select word */}
                <select
                    onChange={e => setWordSelection(e.target.value)}
                    value={wordSelection}
                >
                    <option value="default">Select word</option>
                    {
                        wordsList.map(word => <option key={word} value={word}>{capitalize(word)}</option>)
                    }
                </select>

                <input
                    type="text"
                    placeholder="Place the new word"

                    disabled={wordSelection === 'default' || wordSelection === ''}

                    onChange={e => setNewWord(e.target.value)}
                    value={newWord}
                />
                <input type="submit" value="Edit" />
            </form>
        </div>
    )
}

export default EditWord
