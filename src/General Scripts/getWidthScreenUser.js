const getWidthScreenUser = (setMobileUser) => {

    if (window.innerWidth <= 991.98) {
        setMobileUser(true)
    }

    else {
        setMobileUser(false)
    }
}

export default getWidthScreenUser
