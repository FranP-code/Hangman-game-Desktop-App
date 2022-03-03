import React, {useState} from 'react'
import capitalize from '../../../../Admin/Control Panel/Scripts/Capilazate'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import DemoMessage from '../../DemoMessage/DemoMessage'

const DeleteWordDemo = () => {
    
    const [loading, setLoading] = useState(true)

    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [wordsList, setWordsList] = useState([])

    const [languageSelect, setLanguageSelect] = useState('')
    const [categorySelect, setCategorySelect] = useState('')
    const [wordSelect, setWordSelect] = useState('')

    const [data, setData] = useState(false)

    const [message, setMessage] = React.useState(false)

    const bringData = async (response = false) => {

        const bringCategoriesToThisComponent = async () => {

            const categories = await ['Category A', 'Category B', 'Category C']
            setCategoryList(categories)
        }

        const bringLanguagesToThisComponent = async () => {

            const languages = await ['english', 'spanish']
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
        
        const words = await ['Example 1', 'Example 2', 'Example 3']
        
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

        const response = await {
            sucess: true,
            message: 'All Right!'
        }

        
        setLanguageList([])
        setCategoryList([])
        setWordsList([])
        setLanguageSelect('')
        setCategorySelect('')
        setWordSelect('')
        
        bringData(response)
        setMessage(true)

        ////SendMeEmail('Delete Word')
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
            {
                message ?
                    <DemoMessage setMessage={setMessage}/>
                : null
            }
        </>
    )
}

export default DeleteWordDemo
