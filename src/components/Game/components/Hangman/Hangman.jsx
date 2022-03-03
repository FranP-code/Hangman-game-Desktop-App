import React, {useState} from 'react'
import { images } from './Images'

const Hangman = (props) => {

    
    return (
        <div className="hangman">
            <img src={images[props.hangmanFrame]} alt="" />
        </div>
    )
}

export default Hangman
