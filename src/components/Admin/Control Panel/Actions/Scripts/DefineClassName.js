const DefineClassName = (action) => {

    let className = action.split(' ')

    className = className.map(word => word.toLowerCase())
    className = className.join('-')
    className = className.replaceAll('(', '')
    className = className.replaceAll(')', '')

    return className
}

export default DefineClassName
