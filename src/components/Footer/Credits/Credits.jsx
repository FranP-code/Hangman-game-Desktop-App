import React from 'react'
import { withRouter } from 'react-router'
import AdminHeader from '../../Admin/Header/AdminHeader'
import AppHeader from '../../Game/components/AppHeader/AppHeader'
import IndividualCredit from './IndividualCredit'

//<IndividualCredit
    // titleElement
    // resource
    // resourceLink
    // author
    // authorLink
///>

const Credits = (props) => {
    return (
        <>
        <header>
            <h1>Credits</h1>
            <h2
                onClick={() => props.history.push('/')}
            >
                Back to the Game
            </h2>
        </header>
        <div className="credits">
            <ul>
            {
            <>

                <IndividualCredit
                    titleElement={'Hangman Vector'}
                    resource={'hangman icon'}
                    resourceLink={'https://www.iconbros.com/icons/ib-g-hangman'}
                    author={"IconBros"}
                    authorLink={'https://www.iconbros.com'}
                />

                <IndividualCredit
                    titleElement={'Title Font'}
                    resource={'Raleway'}
                    resourceLink={'https://fonts.google.com/specimen/Raleway'}
                    author={'Matt McInerney, Pablo Impallari, Rodrigo Fuenzalida'}
                    authorLink={'https://fonts.google.com/specimen/Raleway'}
                />

                <IndividualCredit
                    titleElement={'Body Font'}
                    resource={'Helvetica'}
                    resourceLink={'https://www.fonts.com/font/linotype/helvetica?QueryFontType=Web&src=GoogleWebFonts'}
                    author={'Linotype'}
                    authorLink={'https://www.fonts.com/font/linotype'}
                />

                <IndividualCredit
                    titleElement={'CSS Animations'}
                    resource={'Animate.CSS'}
                    resourceLink={'https://animate.style'}
                    author={'Daniel Eden and Friends'}
                    authorLink={'https://animate.style/#contributors'}
                />

                <IndividualCredit
                    titleElement={'Category Icon'}
                    resource={'All categories icons'}
                    resourceLink={'https://www.flaticon.com'}
                    author={'Flaticon'}
                    authorLink={'https://www.flaticon.com'}
                />

                <IndividualCredit
                    titleElement={'Hangman game logic'}
                    resource={'This video help me a lot...'}
                    resourceLink={'https://www.youtube.com/watch?v=jj0W8tYX_q8'}
                    author={'Traversy Media'}
                    authorLink={'https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA'}
                />

                <IndividualCredit
                    titleElement={'Sound - Letter introduced'}
                    resource={'Multimedia button click, short and sharp'}
                    resourceLink={'https://www.zapsplat.com/music/multimedia-button-click-short-and-sharp/'}
                    author={'ZapSplat'}
                    authorLink={'https://www.zapsplat.com/author/zapsplat/'}
                />

                <IndividualCredit
                    titleElement={'Sound - Victoy'}
                    resource={'Alert, mallet, success tone 1'}
                    resourceLink={'https://www.zapsplat.com/music/alert-mallet-success-tone-1/'}
                    author={'ZapSplat'}
                    authorLink={'https://www.zapsplat.com/author/zapsplat/'}
                />
                
                <IndividualCredit
                    titleElement={'Sound - Defeat'}
                    resource={'App, game or system interface deleted, removed or unsuccessful tone 2'}
                    resourceLink={'https://www.zapsplat.com/music/app-game-or-system-interface-deleted-removed-or-unsuccessful-tone-2/'}
                    author={'ZapSplat'}
                    authorLink={'https://www.zapsplat.com/author/zapsplat/'}
                />
            </>
            }
            </ul>
        </div>
        </>
    )
}

export default withRouter(Credits)
