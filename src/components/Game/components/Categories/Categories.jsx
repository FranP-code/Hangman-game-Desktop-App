import React from "react"
import capitalize from "../../../../General Scripts/Capilazate"
import AlmacenateCategory from "../../../../Storage Scripts/AlmacenateCategory"
import AlmacenateCurrentScore from "../../../../Storage Scripts/AlmacenateCurrentScore"
import { AlmacenateLanguage } from "../../../../Storage Scripts/AlmacenateLanguage"
import Bring_All_Categories from "./Firebase Querys/Bring All Categories"
import Bring_All_Languages from "./Firebase Querys/Bring All Languages"

import images from "./Images"


const Categories = ({AppLanguage, displayCategories, category, setCategory, currentScore, setLanguage}, props) => {

    const [categories, setCategories] = React.useState(false)
    const [languages, setLanguages] = React.useState(false)

    const [stretch, setStrech] = React.useState(false)

    const changeCategory = (categorie) => {

        categorie = categorie.toLowerCase()
        setCategory(categorie)

        localStorage.setItem('category', categorie)

        AlmacenateCurrentScore(currentScore)
        AlmacenateLanguage(AppLanguage)

        window.location.reload(true)

    }

    const changeLanguage = (language) => {

        language = language.toLowerCase()
        setLanguage(language)

        localStorage.setItem('language', language)

        AlmacenateCurrentScore(currentScore)
        AlmacenateCategory(category)

        window.location.reload(true)
    }

    React.useEffect (() => {

        Bring_All_Categories(setCategories, setStrech, AppLanguage, category)
        Bring_All_Languages(setLanguages)
        
    }, [])

    return (
        
        <div
            className={ !displayCategories ? `categories hidden animate__animated animate__backOutUp ${stretch}` : `categories show animate__animated animate__backInDown ${stretch}`}
        >
            <select className="Select" onChange={(e) => changeLanguage(e.target.value)}>
                {
                    languages.length > 0 ?
                    
                        languages.map((language) => {

                            if (language === capitalize(AppLanguage)) {
                                
                                return <option key={language} value={language} selected > {language.toUpperCase()} </option>
                            } else {
   
                                return <option key={language} value={language}> {language.toUpperCase()} </option>
                            }
                        })
                        
                        : null
                }
            </select>
            {
                categories.length > 0 ?
                  
                    categories.map((categorie) => {

                        const normalizatedCategorie = categorie[0].toLowerCase()

                        return <button
                                    className={ categorie[0] }
                                    key={categorie[0]}
                                    onClick={() => changeCategory(categorie[0])}
                                >

                                    <img src={images[normalizatedCategorie]} alt={normalizatedCategorie}/>

                                    <span className="text">
                                        { categorie[0].toUpperCase() }
                                    </span>

                                    <div className="blank-space"></div>

                                </button>
                    })

                : null
            }

            <button
                className='Random'
                key='Random'
                onClick={() => changeCategory('')}
            >

                <img src={images['random']} alt="random-icon" />
                <span className="text">
                    {'Random'.toUpperCase()}
                </span>

                <div className="blank-space"></div>
            </button>
        </div>
    )
}

export default Categories
