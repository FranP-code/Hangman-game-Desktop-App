import React, { useState } from 'react'
import "./firstTimeUser.css"
import Navigator from './Navigator/Navigator'
import Page from './Page'
import RegisterForm from './RegisterForm/RegisterForm'
import PreviewWords from './PreviewWords/PreviewWords'
import packWords from './initialWordsPack.json'
import Toast from './Toast/Toast'

//Images import
import addUser from './img/add_user/add-user.png'
import wavingHand from './img/waving_hand/waving_hand.png'
import securityImage from './img/security/security.png'
import register from './img/register/register.png'
import multipleUsers from './img/multiple_users/multiple_users.png'
import wordsLists from './img/words_lists/words_lists.png'
import documentCheck from './img/document_check/document_check.png'
import CreateDatabaseForm from './CreateDatabaseForm/CreateDatabaseForm'

const { ipcRenderer } = window.require('electron')

const FirstTimeUser = ({setFirstTimeUser}) => {

    const [firstTimeReady, setFirstTimeReady] = useState(false)

    const [actualPage, setActualPage] = useState(1)

    const [user, setUser] = useState(false)

    const [blockedNextButton, setBlockedNextButton] = useState(false)
    const [blockedPreviousButton, setBlockedPreviousButton] = useState(false)

    const [previewWords, setPreviewWords] = useState(false)
    const [seeNavigator, setSeeNavigator] = useState(true)

    function createDatabaseWithWordsPack() {
        const argParams = JSON.stringify(packWords)

        ipcRenderer.send('add-database-with-pack-words', argParams)
        ipcRenderer.on('add-database-with-pack-words-reply', (event, arg) => {
            console.log(arg)
            Toast(arg.status, arg.message)

            setTimeout(() => {
                setActualPage(8)
            }, 1000);
        })
    }

    React.useEffect(() => {

        if (actualPage === 4 && !user) {
            setBlockedNextButton(true)
            return
        } else {
            setBlockedNextButton(false)
        }

        switch (actualPage) {
            case 1:
                setBlockedPreviousButton(true)
                break;
            
            case 6:
                setBlockedNextButton(true)
                break;
            
            case 7:
                setBlockedNextButton(true)
                break;
            
            case 8:
                setBlockedNextButton(true)
                setBlockedPreviousButton(true)
                break;

            default:
                setBlockedNextButton(false)
                setBlockedPreviousButton(false)
                break;
        }
    }, [actualPage, user])

    React.useEffect(() => {

        setTimeout(() => {
            setFirstTimeReady(true)
        }, 300);
    }, [])

    return (
        <div className='frist-time-user'>
            <div className={firstTimeReady ? "main" : "main hidden"}>
                <Page actualPage={actualPage} number={1} imageSrc={wavingHand} imageAlt="welcome image" id="page-1">
                    <h1 className='title title-one page-one'>Hello!</h1>
                    <h2 className='title title-two page-one'>Welcome to <span className='strong'>Hangman Game</span></h2>
                    <h3 className='sub-title title-three page-one'>(Desktop version)</h3>  
                </Page>
                <Page actualPage={actualPage} number={2} imageSrc={addUser} imageAlt="register image">
                    <h3 className='title title-three'>For administrate the words in the app</h3>
                    <h2 className='title title-two'>You need to create an account</h2>
                </Page>
                <Page actualPage={actualPage} number={3} imageSrc={securityImage} imageAlt="security image">
                    <h2 className='title title-two'>Don't worry, all the data stays in the app</h2>
                    <h3 className='title title-three sub-title'>Even you can use it without connection!</h3>
                </Page>
                <Page actualPage={actualPage} number={4} imageSrc={register} imageAlt="register image">
                    <RegisterForm user={user} setUser={setUser}/>
                </Page>
                <Page actualPage={actualPage} number={5} imageSrc={multipleUsers} imageAlt="multiple users image">
                    <h3 className='title title-three'>Remember, for create more accounts you need to provide your <span className="strong">reffer code</span></h3>
                    <h4 className='title title-four sub-title'>This can be found on Admin Place/Profile</h4>
                </Page>
                <Page actualPage={actualPage} number={6} imageSrc={wordsLists} imageAlt="words lists image" id="page-6">
                    <h3 className='title title-three'>One more step...</h3>
                    <h4 className='title title-four'>Do you want to add a initial pack of words?</h4>
                    <div className="buttons-container">
                        <button
                            className='yes'
                            onClick={createDatabaseWithWordsPack}
                        >
                            {
                                "Yes!".toUpperCase()
                            }
                        </button>
                        <button
                            className='preview'
                            onClick={() => {
                                setSeeNavigator(!seeNavigator)
                                setPreviewWords(!previewWords)
                                document.body.style.overflowX = !previewWords ? "hidden" : "visible"
                            }}
                        >
                                {
                                    seeNavigator ?
                                        "Preview words".toUpperCase()
                                    :
                                        "Hide words".toUpperCase()
                                }
                            </button>
                        <button
                            className='no'
                            onClick={() => setActualPage(7)}
                        >
                            {"No, thank you".toUpperCase()}
                        </button>
                    </div>
                    {
                        previewWords ?
                            <PreviewWords previewWords={previewWords}/>
                        :null
                    }
                </Page>
                <Page actualPage={actualPage} number={7} id="page-7">
                    <h3 className='title title-three sub-title'>Well, in that case...</h3>
                    <h5 className='title title-five'>I need that you fill the first language, category and word of the game</h5>
                    <CreateDatabaseForm setActualPage={setActualPage}/>
                </Page>
                <Page actualPage={actualPage} number={8} imageSrc={documentCheck} imageAlt={"document check image"} id="page-8">
                    <h2 className='title title-two'>All done!</h2>
                    <h3 className='title title-three'>Enjoy the game. Francisco.</h3>
                    <div className="buttons-container">

                        <button
                            onClick={() => setFirstTimeUser(false)}
                            className="yes"
                        >
                            Go to the game
                        </button>
                    </div>
                </Page>
            </div>
            {
                seeNavigator ?
                    <Navigator
                        previousAction={() => setActualPage(actualPage - 1)} 
                        nextAction={() => setActualPage(actualPage + 1)}
                        blockedNextButton={blockedNextButton}
                        blockedPreviousButton={blockedPreviousButton}
                    />
                : null
            }
        </div>
    )
}

export default FirstTimeUser