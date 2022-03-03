import React from 'react'
import loadingGifLightTheme from './loading-light-theme.png'

const Loading = () => {
    return (
        <div className='loading'>
            <img src={loadingGifLightTheme} alt="loading" />
        </div>
    )
}

export default Loading
