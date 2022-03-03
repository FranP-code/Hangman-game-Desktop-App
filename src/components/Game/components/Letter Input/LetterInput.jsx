import React from 'react'

const LetterInput = () => {
    
    
    const registerInput = (letter) => {

        const input = document.getElementById('letter-input')
        const currentKey = letter

        document.dispatchEvent(new KeyboardEvent('keyup', input));
            input.value = ''
        }

    return (
        <div className="letter-input-container">
            <input id="letter-input" type="text" onChange={(e) => registerInput(e.target.value) } />
        </div>
    )
}

export default LetterInput
