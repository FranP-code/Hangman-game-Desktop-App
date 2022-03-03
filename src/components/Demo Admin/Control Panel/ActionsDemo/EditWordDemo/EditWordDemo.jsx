import React, {useState} from 'react'
import capitalize from '../../../../Admin/Control Panel/Scripts/Capilazate'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import DemoMessage from '../../DemoMessage/DemoMessage'

const EditWordDemo = () => {
    
    const [loading, setLoading] = useState(true)

    const [languageList, setLanguageList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [wordsList, setWordsList] = useState([])

    const [languageSelection, setLanguageSelection]  = useState('default')
    const [categorySelection, setCategorySelection]  = useState('default')
    const [wordSelection, setWordSelection] = useState('default')

    const [newWord, setNewWord] = useState('')

    const [data, setData] = useState(false)

    const [message, setMessage] = React.useState(false)

    const bringLanguagesToThisComponent = async () => {
    
        const languages = await ['english', 'spanish']
        setLanguageList(languages)

        setLoading(false)
    } 

    const applyLanguage = (languageSelected) => {

        if (languageSelected === '' || languageSelected === 'default') {

            setLanguageSelection('default')
            return
        }

        setCategorySelection('default')
        setWordSelection('default')

        setLanguageSelection(languageSelected)
        bringCategoriesToThisComponent()
    }

    const bringCategoriesToThisComponent = async () => {

        setLoading(true)

        const category = await ['Category A', 'Category B', 'Category C']
        
        await setCategoryList(category)

        setLoading(false)
    }

    const applyCategory = (categorySelected) => {

        if (categorySelected === '' || categorySelected === 'default') {

            setLanguageSelection('default')
            return
        }

        setCategorySelection(categorySelected)

        bringWordsToThisComponent(categorySelected)
    }

    const bringWordsToThisComponent = async (categorySelected) => {

        setLoading(true)

        setWordsList(['Example 1', 'Example 2', 'Example 3'])

        setLoading(false)
    }

    const submitEditWord = async (e) => {

        e.preventDefault()
        
        setData(false)
        setLoading(true)

        if (languageSelection === '' || languageSelection === 'default') {

            setData({
                sucess: false,
                message: `Looks like language are empty...`
            })

            return
        }
        
        if (categorySelection === '' || categorySelection === 'default') {

            setData({
                sucess: false,
                message: `Looks like category are empty...`
            })

            return
        }

        if (wordSelection === '' || wordSelection === 'default') {

            setData({
                sucess: false,
                message: `Looks like the word selected are empty...`
            })

            return
        }

        if (newWord === '' || newWord === 'default') {

            setData({
                sucess: false,
                message: `Please, introduce a new word`
            })

            return
        }

        setData({
            sucess: true,
            message: `All Right!`
        })

        setLanguageSelection('default')
        setCategorySelection('default')
        setWordSelection('default')
        setNewWord('')
        
        setLoading(false)

        setMessage(true)
        ////SendMeEmail('Edit word')
    }

    React.useEffect(() => {

        bringLanguagesToThisComponent()

    },[])

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
                <div className="action-form edit-word">
                    <form
                        onSubmit={e => submitEditWord(e)}
                    >

                        <select
                            onChange={e => applyLanguage(e.target.value)}
                            value={languageSelection}
                        >
                            <option value="default">Select language</option>
                            {
                                languageList.map(language => 
                                    <option value={language} key={language}>{capitalize(language)}</option>
                                )
                            }    
                        </select>

                        <select
                            onChange={e => applyCategory(e.target.value)}
                            value={categorySelection}
                            disabled={languageSelection === 'default' && !loading ? true : false}
                        >
                            <option value="default">Select category</option>
                            {
                                categoryList.map(category => 
                                    <option value={category} key={category}>{capitalize(category)}</option>    
                                )
                            }    
                        </select>

                        <select
                            onChange={e => setWordSelection(e.target.value)}
                            value={wordSelection}
                            disabled={categorySelection === 'default' && !loading ? true : false}
                        >
                            <option value="default">Select word</option>
                            {
                                wordsList.map(word => <option key={word} value={word}>{capitalize(word)}</option>)
                            }
                        </select>

                        <input
                            type="text"
                            placeholder="Place the new word"

                            disabled={wordSelection === 'default' && !loading ? true : false}

                            onChange={e => setNewWord(e.target.value)}
                            value={newWord}
                        />
                        <input type="submit" value="Edit" />
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

export default EditWordDemo
