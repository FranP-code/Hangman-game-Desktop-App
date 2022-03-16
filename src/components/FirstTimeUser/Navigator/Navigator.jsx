import React from 'react'
import './navigator.css'
import useKeypress from 'react-use-keypress';

const Navigator = ({previousAction, nextAction, blockedPreviousButton, blockedNextButton}) => {

    useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          previousFunction();
        }
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          nextFunction();
        }
    });

    //! WTF REACT, I HAVE TO USE A EXTERNAL PACKAGE FOR HANDLE THE USER'S KEYBOARD INPUTS BECAUSE THEY DONT REGISTER THE STATES CHANGES, WTF.
    //! 30 MINUTES WITH THIS SHIT PROBLEM, WTF.

    function previousFunction() {
        console.log(blockedPreviousButton)
        if (blockedPreviousButton) {
            return
        }
        previousAction()
    }

    function nextFunction() {
        console.log(blockedNextButton)
        if (blockedNextButton) {
            return
        }
        nextAction()
    }

    return (
        <div id='navigator'>
            <div className={blockedPreviousButton ? "arrow blocked" : "arrow"} alt="left-arrow" onClick={previousFunction}>
                <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='240' height='240'><path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path></svg>
            </div>
            <div className={blockedNextButton ? "arrow blocked" : "arrow"} alt="right-arrow" onClick={nextFunction}>
                <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='240' height='240'><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"></path></svg>
            </div>
        </div>
    )
}

export default Navigator