const SelectRandomWord = (arrayWords) => {

    const randomWord = Math.trunc(

        Math.random() * (arrayWords.length - 0) + 0
    )
    
    if (arrayWords[randomWord] === undefined) {

        return SelectRandomWord()
    }

    return arrayWords[randomWord]
}

export default SelectRandomWord
