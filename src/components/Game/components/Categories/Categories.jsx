import React from "react"
import capitalize from "../../../../General Scripts/Capilazate"
import AlmacenateCategory from "../../../../Storage Scripts/AlmacenateCategory"
import AlmacenateCurrentScore from "../../../../Storage Scripts/AlmacenateCurrentScore"
import { AlmacenateLanguage } from "../../../../Storage Scripts/AlmacenateLanguage"

import images from "./Images"
import AdjustHeightCategories from "./Scripts/AdjustHeightCategories"

const { ipcRenderer } = window.require('electron')

const Categories = ({AppLanguage, displayCategories, category, setCategory, currentScore, setLanguage, languages, categories, stretch}) => {


    const changeCategory = (categorie) => {

        categorie = categorie.toLowerCase()
        setCategory(categorie)

        localStorage.setItem('category', categorie)

        AlmacenateCurrentScore(currentScore)
        AlmacenateLanguage(AppLanguage)

        window.location.reload(true)

    }

    const changeLanguage = (language) => {

        console.log(language);

        language = language.toLowerCase()
        setLanguage(language)

        localStorage.setItem('language', language)

        AlmacenateLanguage(language)
        AlmacenateCurrentScore(currentScore)
        AlmacenateCategory(category)

        window.location.reload(true)
    }

    return (
        
        <div
            className={ !displayCategories ? `categories hidden animate__animated animate__backOutUp ${stretch}` : `categories show animate__animated animate__backInDown ${stretch}`}
        >
            <select className="Select" onChange={(e) => changeLanguage(e.target.value)}>
                {
                    languages.length > 0 ?
                    
                        languages.map((language) => {

                            if (language === AppLanguage) {
                                
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

                        return (
                            <button
                                key={categorie.text}
                                onClick={() => changeCategory(categorie.text)}
                            >
                                {

                                    categorie.imageURL ?
                                        <img src={categorie.imageURL} alt={`${categorie.text} image`}/>
                                    : <div className="blank-space"/>
                                }

                                <span className="text">
                                    { categorie.text.toUpperCase() }
                                </span>

                                <div className="blank-space"></div>

                            </button>
                        )
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
