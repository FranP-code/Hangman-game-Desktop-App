import React from "react"
import defeatSound from './sounds/Defeat Sound.mp3'

const Defeat = ({language}) => {

    const [text, setText] = React.useState('')

    React.useEffect(() => {
        
        const playAudio = () => {

            const audio = document.getElementsByClassName('defeat-audio-container')[0]
            audio.play()
    
        }

        if (language === 'english') {

            setText('DEFEAT')
        }

        if (language === 'spanish') {

            setText('PERDISTE')
        }

        playAudio()
        
    }, [])

    return (
        <>
            <div className="defeat animate__animated animate__backInDown">
                <h1>{text}</h1>
            </div>
            <audio className="defeat-audio-container">
                <source src={defeatSound} type="audio/mp3" autoPlay="true"></source>
            </audio>
        </>
    )
}

export default Defeat
