import React, {useState} from 'react'
import SendMeEmail from '../../Email/SendMeEmail'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import capitalize from '../../Scripts/Capilazate'
import BringCategories from '../AddWord/Firebase Querys/BringCategories'
import BringLanguages from '../AddWord/Firebase Querys/BringLanguages'
import BringTheWordsFromFirebase from './Firebase Querys/BringTheWordsFromFirebase'
import DeleteWordFromFirebase from './Firebase Querys/DeleteWordFromFirebase'

const DeleteWord = () => {

    const [loading, setLoading] = useState(true)

    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [wordsList, setWordsList] = useState([])

    const [languageSelect, setLanguageSelect] = useState('')
    const [categorySelect, setCategorySelect] = useState('')
    const [wordSelect, setWordSelect] = useState('')

    const [data, setData] = useState(false)

    const bringData = async (response = false) => {

        const bringCategoriesToThisComponent = async () => {

            const categories = await BringCategories()
            setCategoryList(categories)
        }

        const bringLanguagesToThisComponent = async () => {

            const languages = await BringLanguages()
            setLanguageList(languages)
        }

        await bringCategoriesToThisComponent()
        await bringLanguagesToThisComponent()

        if (response) {
            setData(response)

        } 

        setLoading(false)
    }


    const bringWords = async (category) => {

        setLoading(true)
        setCategorySelect(category)
        
        const words = await BringTheWordsFromFirebase(languageSelect, category)
        
        await setWordsList(words)
        await setLoading(false)

    }

    const submitForm = async (e) => {

        e.preventDefault()
        setLoading(true)

        if (languageSelect === '' || languageSelect === 'default') {

            setData({
                submit: false,
                message: 'Language empty'
            })
            
            return
        }

        if (categorySelect === '' || categorySelect === 'default') {

            setData({
                submit: false,
                message: 'Category empty'
            })
            
            return
        }

        if (wordSelect === '' || wordSelect === 'default') {

            setData({
                submit: false,
                message: 'No word selected'
            })

            return
        }

        const response = await DeleteWordFromFirebase(languageSelect, categorySelect, wordSelect)

        
        setLanguageList([])
        setCategoryList([])
        setWordsList([])
        setLanguageSelect('')
        setCategorySelect('')
        setWordSelect('')
        
        bringData(response)
        SendMeEmail('Delete Word')
    }
    
    React.useEffect(() => {
        
        bringData()

    }, [])

    return (
        <>
            {
                data ?
                   <Messages data={data} />
                : null
            }
            <div className="action-form delete-word">
                {
                    loading ?
                        <Loading />
                    : null
                }   
                <form
                    onSubmit={(e) => submitForm(e)}
                >

                    <select
                        onChange={(e) => {
                            setLanguageSelect(e.target.value)
                            setCategorySelect('')
                        }}
                    >
                        <option value="default">Select language</option>
                        {
                            languageList.map(language => <option key={language} value={language}>{capitalize(language)}</option>)
                        }
                    </select>

                    <select
                        disabled={languageSelect === '' && !loading ? true : false}
                        onChange={(e) => bringWords(e.target.value)}
                        value={categorySelect}
                    >
                        <option value="default">Select category</option> 
                        {
                            categoryList.map(category => <option key={category} value={category}>{capitalize(category)}</option>)
                        }   
                    </select>
                    <select
                        disabled={categorySelect === '' && !loading ? true : false}
                        onChange={(e) => setWordSelect(e.target.value)}
                        value={wordSelect}
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
