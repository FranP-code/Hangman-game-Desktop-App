import React from 'react'
import initialWordsPack from '../initialWordsPack.json'
import './previewWords.css'
import Capitalize from '../../../General Scripts/Capilazate'

const PreviewWords = ({previewWords}) => {

    const languages = Object.keys(initialWordsPack.hangmanWords)

    React.useEffect(() => {
        console.log(Object.entries(initialWordsPack.hangmanWords.english))
        console.log(languages)
    })

    return (
        <div className={previewWords ? "preview-words" : "preview-words hidden"}>
            {
                languages.map(language => (
                    <div key={language} className="language">
                        <h1>{Capitalize(language)}</h1>
                        {
                            Object.entries(initialWordsPack.hangmanWords[language]).map(category => (
                                <div key={category[0]} className="category">
                                    <div className="title">
                                        {
                                            category.icon ?
                                                <img src={category.icon} alt={category[0] + 'icon'}/>
                                            : null
                                        }
                                        {/* <img src={"https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png"} alt={category[0] + 'icon'}/> */}
                                        <h2>{Capitalize(category[0])}</h2>
                                    </div>
                                    <ul>
                                        {
                                            category[1].words.map(word => (
                                                <li>{Capitalize(word)}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default PreviewWords