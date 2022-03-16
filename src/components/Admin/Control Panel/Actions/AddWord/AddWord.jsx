import React, {useState, useContext} from 'react'
import Loading from '../../../../Loading/Loading'
import BringCategories from './Firebase Querys/BringCategories'
import BringLanguages from './Firebase Querys/BringLanguages'
import capitalize from '../../Scripts/Capilazate'
import Messages from '../../../../Messages/Messages'
import AddWordToFirebase from './Firebase Querys/AddWordToFirebase'
import SendMeEmail from '../../Email/SendMeEmail'
import getCategoryForDatabase from './Firebase Querys/getCategoryForDatabase'
import UserDataContext from '../../../../../contexts/UserDataContext'
import Toast from '../../../Toast/Toast'

const { ipcRenderer } = window.require('electron')

const AddWord = ({demo}) => {

    const context = useContext(UserDataContext)

    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [languageSelection, setLanguageSelection]  = useState(false)
    const [categorySelection, setCategorySelection]  = useState(false)
    const [wordsToAdd, setWordsToAdd] = useState('') 

    const [data, setData] = useState(false)

    React.useEffect(() => {

        ipcRenderer.send('hangman-words-querys-get-languages')

        ipcRenderer.once('hangman-words-querys-get-languages-reply', (event, arg) => {
            console.log(arg)
            setLanguageList(arg)
        })
        
    }, [])

    const changeLanguage = (e) => {

        setLanguageSelection(e.target.value)
        setCategorySelection(false)

        ipcRenderer.send('hangman-words-querys-get-categories', e.target.value)

        ipcRenderer.once('hangman-words-querys-get-categories-reply', (event, arg) => {
            console.log(arg)
            // setLanguageList(arg)
            setCategoryList(arg)
        })
    }

    const submitInformation = async (e) => {
        
        e.preventDefault()

        if (demo) {

            Toast('info', 'You must to be logged for run that function')
            return
        }

        setData(false)

        if (!languageSelection || languageSelection === 'default') {

            setData({
                sucess: false,
                message: `Language is not supposed to be empty`
            })

            return
        }

        if (!categorySelection || categorySelection === 'default') {

            setData({
                sucess: false,
                message: `Category is not supposed to be empty`
            })

            return
        }
        
        if (!wordsToAdd || wordsToAdd === '') {

            setData({
                sucess: false,
                message: `Words is not supposed to be empty`
            })

            return
        }


        let splitedWords = wordsToAdd.split(',')

        splitedWords = splitedWords.map(word => word.trim())
        splitedWords = splitedWords.map(word => word.toLowerCase())
        splitedWords = splitedWords.map(word => capitalize(word))

        const ipcArgs = JSON.stringify({
            words: splitedWords,
            language: languageSelection,
            category: categorySelection,
            userData: context.userData
        })

        ipcRenderer.send('hangman-words-querys-add-words-array', ipcArgs)

        ipcRenderer.once('hangman-words-querys-add-words-array-reply', (event, arg) => {
            
            setLanguageSelection('')
            setCategorySelection('')
            setWordsToAdd('')
            
            Toast(arg.status, arg.message)
        })
    }

    return (
        <>
            {
                data ?
                    <Messages data={data} />        
                : null
            }
            <div className="action-form add-word">
                <form
                    onSubmit={(e) => submitInformation(e)}
                >
                    <select
                        onChange={(e) => changeLanguage(e)}
                        value={languageSelection}
                    >
                        <option value="default">Select language</option>
                        {
                            languageList.map( language => <option key={language} value={language}>{capitalize(language)}</option>)
                        }
                    </select>
                    
                    <select
                        onChange={(e) => setCategorySelection(e.target.value)}
                        value={categorySelection}

                        disabled={languageSelection === false || languageSelection === 'default' ? true : false}
                    >
                        <option value="default">Select category</option>
                        {
                            categoryList.map( category => <option key={category.text} value={category.text}>{capitalize(category.text)}</option>)
                        }
                    </select>
                    <textarea
                        placeholder="Add the word/words separated by commas"
                        cols="30" rows="10"
                        onChange={(e) => setWordsToAdd(e.target.value)}
                        value={wordsToAdd}

                        disabled={categorySelection === false || categorySelection === 'default' ? true : false}
                    />
                    <input type="submit" value="Add Word(s)" />
                </form>
            </div>  
        </>
    )
}

export default AddWord
