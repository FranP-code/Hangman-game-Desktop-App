import React, {useState} from 'react'
import capitalize from '../../../../Admin/Control Panel/Scripts/Capilazate'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import DemoMessage from '../../DemoMessage/DemoMessage'
import DemoMessageLogic from '../../DemoMessage/DemoMessageLogic'

const AddWordDemo = () => {
    const [loading, setLoading] = useState(true)
    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [languageSelection, setLanguageSelection]  = useState(false)
    const [categorySelection, setCategorySelection]  = useState(false)
    const [wordsToAdd, setWordsToAdd] = useState('') 

    const [data, setData] = useState(false)

    const [canceledAddingWords, setCanceledAddingWords] = useState(false)

    const [message, setMessage] = useState(false)

    const bringData = async () => {

        setLanguageList(['english', 'spanish'])
        setCategoryList(['Category A', 'Category B', 'Category C'])

        setLoading(false)
    } 

    React.useEffect(() => {

        bringData()
        
    }, [])

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
        
        if (!wordsToAdd || wordsToAdd === '') {

            setData({
                sucess: false,
                message: `Words is not supposed to be empty`
            })
            await setLoading(false)

            return
        }

        // // let splitedWords = wordsToAdd.split(',')

        // // splitedWords = splitedWords.map(word => word.trim())
        // // splitedWords = splitedWords.map(word => word.toLowerCase())
        // // splitedWords = splitedWords.map(word => capitalize(word))

        // const uploadWordsPromise = new Promise((resolve, reject) => {
            
        //         splitedWords.forEach(async (word, index) => {
                       
        //                if (!canceledAddingWords) {
                           
        //                    if (await AddWordToFirebase(languageSelection, categorySelection, word, setData) === 'error') {
                               
        //                        setCanceledAddingWords(true)
        //                    }

        //                    if (index === splitedWords.length -1) resolve();
        //                }
        //            }) 
        //     }   
        // )

        setData({
            sucess: true,
            message: 'All Right!'
        })

        setLanguageSelection('')
        setCategorySelection('')
        setWordsToAdd('')

        setLoading(false)
        ////SendMeEmail('Add Word(s)')

        //! CREDITS FOR THE PROMISE LOGIC: https://stackoverflow.com/a/38407013

        setMessage(true)
    }

    const changeLanguage = (e) => {

        setLanguageSelection(e.target.value)
        setCategorySelection(false)
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
            {
                message ?
                    <DemoMessage setMessage={setMessage}/>
                : null
            }
        </>
    )
}

export default AddWordDemo
