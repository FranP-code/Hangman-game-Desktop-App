import React, {useState} from 'react'
import {withRouter} from "react-router-dom"


const AppHeader = ({language, category, displayCategories, setDisplayCategories, history}) => {

    const [title, setTitle] = useState('')
    const [categoryText, setCategoryText] = useState('')

    React.useEffect( () => {

        if (language === 'english') {
            
            setTitle('Hangman game')
            setCategoryText('Select category')
        }

        if (language === 'spanish') {

            setTitle('Ahorcado')
            setCategoryText('Seleccionar categoría')
        }

        if (category) {

            if (category !== 'false') {
                
                let categoryText = category.split('')
                categoryText[0] = categoryText[0].toUpperCase()
                
                setCategoryText(categoryText)
            }
        }

    }, [category])

    return (
        <header>
            <h1>{title}</h1>
            <h2
                onClick={() => setDisplayCategories(!displayCategories)}
            >
                {categoryText}
            </h2>
            <button
                className="redirect-button"
                onClick={() => history.push('/identify')}
            >
                Admin Place
            </button>
        </header>
    )
}

export default withRouter(AppHeader)
