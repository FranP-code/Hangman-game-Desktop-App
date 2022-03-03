const checkVictory = (setEndOfGame) => {

    let parent_element = document.getElementById('word').childNodes
        parent_element = [...parent_element]

    let result = true

    parent_element.forEach(children => {

        if (children.innerText === '') {
            result = false
        }

    });

    if (result) {
       
        setEndOfGame('Victory')
    }
}

export default checkVictory
