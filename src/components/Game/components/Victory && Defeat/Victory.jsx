import React from 'react'
import victorySound from './sounds/Victory sound.mp3'

const Victory = ({currentScore, setCurrentScore, language}) => {

    const [text, setText] = React.useState('')

    React.useEffect(() => {

        const playAudio = () => {

            const audio = document.getElementsByClassName('victory-audio-container')[0]
            audio.play()
    
        }

        setCurrentScore(parseInt(currentScore) + 1)

        if (language === 'english') {

            setText('VICTORY')
        }

        if (language === 'spanish') {

            setText('VICTORIA')
        }

        playAudio()
        
    }, [])

    return (
        <>
            <div className="victory animate__animated animate__backInDown">
                <h1>{text}</h1>
            </div>
            <audio className="victory-audio-container">
                <source src={victorySound} type="audio/mp3" autoPlay="true"></source>
            </audio>
        </>
    )
}

export default Victory
