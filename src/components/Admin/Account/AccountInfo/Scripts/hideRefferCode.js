const hideRefferCode = (refferCode) => {
    
    let hiddenRefferCode = ''

    for (let i = 0; i < refferCode.length; i++) {
        hiddenRefferCode = hiddenRefferCode + '•'
    } 

    return hiddenRefferCode
}

export default hideRefferCode
