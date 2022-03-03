import React from 'react'

const LettersRegistered = ({lettersRegistered}) => {
    return (
        <div className='letters-registered'>
            {lettersRegistered.map((letter, i) => <span key={i}>{letter}</span>)}
        </div>
    )
}

export default LettersRegistered
