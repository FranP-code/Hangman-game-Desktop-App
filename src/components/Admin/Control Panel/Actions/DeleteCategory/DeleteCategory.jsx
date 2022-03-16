import React, { useContext, useRef, useState } from 'react'
import SendMeEmail from '../../Email/SendMeEmail'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import capitalize from '../../Scripts/Capilazate'
import BringCategories from './Firebase Querys/BringCategories'
import DeleteCategoryFirebase from './Firebase Querys/DeleteCategoryFirebase'
import Toast from '../../../Toast/Toast'
import UserDataContext from '../../../../../contexts/UserDataContext'
const { ipcRenderer } = window.require('electron')

const DeleteCategory = ({demo}) => {
    const context = useContext(UserDataContext)

    const [data, setData] = React.useState(false)

    const [languages, setLanguages] = useState([])
    const [categories, setCategories] = useState([])

    const [languageInput, setLanguageInput] = useState('')
    const [categoryInput, setCategoryInput] = useState('')

    function getLanguages() {
        ipcRenderer.send('hangman-words-querys-get-languages')
        ipcRenderer.on('hangman-words-querys-get-languages-reply', (event, arg) => {
            console.log(arg)
            setLanguages(arg)
        })
    }

    function getCategories(language) {
        console.log(language)

        setLanguageInput(language)

        ipcRenderer.send('hangman-words-querys-get-categories', language)
        ipcRenderer.on('hangman-words-querys-get-categories-reply', (event, arg) => {
            console.log(arg)
            setCategories(arg)
        })
    }

    const submitDeleteCategory = async (e) => {

        e.preventDefault()

        if (demo) {

            Toast('info', 'You must to be logged for run that function')
            return
        }
        
        console.log(categoryInput)
        console.log(languageInput)
        
        if (!categoryInput  || categoryInput === 'default') {

            setData({
                sucess: false,
                message: 'The category is empty'
            })

            return
        }

        const answer = window.confirm(`Are you sure?, this is gonna delete all words in ${capitalize(categoryInput)}'s category`) //! CREDITS: https://stackoverflow.com/a/9334679

        if (answer) {

            const ipcArgs = JSON.stringify({
                language: languageInput,
                category: categoryInput,
                userData: context.userData
            })
    
            ipcRenderer.send('hangman-words-querys-delete-category', ipcArgs)
            ipcRenderer.once('hangman-words-querys-delete-category-reply', (event, arg) => {
                Toast(arg.status, arg.message)

                setCategoryInput('')
                setLanguageInput('')
            })
        }
    }

    React.useEffect(() => {
        getLanguages()
    }, [])

    return (
        <>
            {
                data ?
                    <Messages data={data} />        
                : null
            }
            <div className="action-form delete-category">
                <form
                    onSubmit={(e) => submitDeleteCategory(e)}
                >
                    <select
                        onChange={(e) => {
                            getCategories(e.target.value)
                        }}
                    >
                        <option value='default'>Select a language</option>
                        {
                            languages.map(language => <option key={language} value={language}>{capitalize(language)}</option>)
                        }
                    </select>
                    <select
                        onChange={(e) => setCategoryInput(e.target.value)}
                    >
                        <option value="default">Select a category</option>
                        {
                            categories.map(category => <option key={category.text} value={category.text}>{capitalize(category.text)}</option>)
                        }
                    </select>
                    <input type="submit" value="Delete"/>
                </form>
            </div>
        </>
    )
}

export default DeleteCategory
