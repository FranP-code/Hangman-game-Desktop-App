import React, {useState} from 'react'
import Loading from '../../../../Loading/Loading'
import BringCategories from './Firebase Querys/BringCategories'
import BringLanguages from './Firebase Querys/BringLanguages'
import capitalize from '../../Scripts/Capilazate'
import Messages from '../../../../Messages/Messages'
import AddWordToFirebase from './Firebase Querys/AddWordToFirebase'
import SendMeEmail from '../../Email/SendMeEmail'
import getCategoryForDatabase from './Firebase Querys/getCategoryForDatabase'


const AddWord = () => {

    const [loading, setLoading] = useState(true)
    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [languageSelection, setLanguageSelection]  = useState(false)
    const [categorySelection, setCategorySelection]  = useState(false)
    const [wordsToAdd, setWordsToAdd] = useState('') 

    const [data, setData] = useState(false)

    const [canceledAddingWords, setCanceledAddingWords] = useState(false)

    const bringData = async () => {

        const language = await BringLanguages()
        const category = await BringCategories()

        setLanguageList(language)
        setCategoryList(category)

        setLoading(false)
    } 

    React.useEffect(() => {

        bringData()
        
    }, [])

    const changeLanguage = (e) => {

        setLanguageSelection(e.target.value)
        setCategorySelection(false)
    }

    const submitInformation = async (e) => {
        
        e.preventDefault()
        setLoading(true)

        setData(false)
        setCanceledAddingWords(false)

        if (!languageSelection || languageSelection === 'default') {

            setData({
                sucess: false,
                message: `Language is not supposed to be empty`
            })
            await setLoading(false)

            return
        }

        if (!categorySelection || categorySelection === 'default') {

            setData({
                sucess: false,
                message: `Category is not supposed to be empty`
            })
            await setLoading(false)

            return
        }

        const categoryForDatabase = await getCategoryForDatabase(categorySelection, languageSelection)
        
        if (!wordsToAdd || wordsToAdd === '') {

            setData({
                sucess: false,
                message: `Words is not supposed to be empty`
            })
            await setLoading(false)

            return
        }


        let splitedWords = wordsToAdd.split(',')

        splitedWords = splitedWords.map(word => word.trim())
        splitedWords = splitedWords.map(word => word.toLowerCase())
        splitedWords = splitedWords.map(word => capitalize(word))

        console.log(categoryForDatabase);

        const uploadWordsPromise = new Promise((resolve, reject) => {
            
                splitedWords.forEach(async (word, index) => {
                       
                       if (!canceledAddingWords) {
                           
                           if (await AddWordToFirebase(languageSelection, await categoryForDatabase, word, setData) === 'error') {
                               
                               setCanceledAddingWords(true)
                           }

                           if (index === splitedWords.length -1) resolve();
                       }
                   }) 
            }   
        )

        uploadWordsPromise.then(() => {

            setLanguageSelection('')
            setCategorySelection('')
            setWordsToAdd('')

            setLoading(false)
            SendMeEmail('Add Word(s)')
        })

        //! CREDITS FOR THE PROMISE LOGIC: https://stackoverflow.com/a/38407013
    }

    return (
        <>
            {
                data ?
                    <Messages data={data} />        
                : null
            }
            {
                loading ? 
                    <Loading />
                :
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
                                categoryList.map( category => <option key={category} value={category}>{capitalize(category)}</option>)
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
            }   
        </>
    )
}

export default AddWord
