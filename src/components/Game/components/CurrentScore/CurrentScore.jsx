import React from 'react'

const CurrentScore = ({currentScore, language}) => {

    const [text, setText] = React.useState('')

    React.useEffect(() => {

        if (language === 'spanish') {
            setText('Puntuación: ')
        }
        
        if (language === 'english') {
            setText('Current Score: ')
        }

    })

    return (
        <div className='current-score'>
            <h2>
                <span className='text'>
                    {text}
                </span>

                {currentScore}
                </h2>
        </div>
    )
}

export default CurrentScore
