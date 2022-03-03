import React from 'react'

const Word = ({selectedWord, correctLetters}) => {

    let blankSpaces = 0

    return (
        <div className="word" id='word'>
            {
                selectedWord.split('').map((letter, i) => {

                    letter = letter.toLowerCase()

                    if (letter === ' ') {

                        blankSpaces++
                        return (
                            <span className="letter blank" key={i}>
                                &#8205;
                            </span>
                        )
                    }

                    if (i === 0) {
                        letter = letter.toUpperCase()
                    }

                    return (
                        <span className='letter' key={i}>
                            {correctLetters.includes(letter.toLowerCase()) ? letter : ''}
                        </span>
                    )
                })
            }

            <span className='counter'>
                ({selectedWord.length - blankSpaces})
            </span>
        </div>
    )
}

export default Word
