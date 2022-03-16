import React, {useState} from "react";
import CurrentScore from "./components/CurrentScore/CurrentScore";
import Hangman from "./components/Hangman/Hangman";
import Victory from "./components/Victory && Defeat/Victory";
import Defeat from "./components/Victory && Defeat/Defeat";
import Loading from "./components/Loading/Loading";
import AlmacenateCurrentScore from "../../Storage Scripts/AlmacenateCurrentScore";
import Categories from "./components/Categories/Categories";
import AlmacenateCategory from "../../Storage Scripts/AlmacenateCategory";
import { RecoveryCurrentScore } from "../../Storage Scripts/RecoveryCurrentScore";
import { RecoveryCurrentCategory } from "../../Storage Scripts/RecoveryCurrentCategory";
import { AlmacenateLanguage } from "../../Storage Scripts/AlmacenateLanguage";
import Word from "./components/Word/Word";
import LettersRegistered from "./components/LettersRegistered/LettersRegistered";
import alphabet from "../../General Scripts/alphabet"
import checkVictory from "../../General Scripts/checkVictory";
import checkDefeat from "../../General Scripts/checkDefeat";
import getWidthScreenUser from "../../General Scripts/getWidthScreenUser";
import LetterInput from "./components/Letter Input/LetterInput";
import introducedLetterSound from './sound/Letter introduced.mp3';
import AppHeader from "./components/AppHeader/AppHeader";
import capitalize from "../../General Scripts/Capilazate";
import AdjustHeightCategories from "./components/Categories/Scripts/AdjustHeightCategories";
import {RecoveryCurrentLanguage} from '../../Storage Scripts/RecoveryCurrentLanguage.js'

const { ipcRenderer } = window.require('electron')

function Game() {

  const [displayApp, setDisplayApp] = useState(false)
  const [mobileUser, setMobileUser] = useState(false)

  const [selectedWord, setSelectedWord] = useState('')

  const [correctLetters, setCorrectLetters] = useState([])
  const [lettersRegistered, setLettersRegistered] = useState([])
  
  const [listOflanguages, setListOfLanguages] = React.useState([])
  const [language, setLanguage] = useState('')
  const [languageIsReady, setLanguageIsReady] = useState(false)

  const [categoriesList, setCategoriesList] = React.useState(false)
  const [category, setCategory] = useState(false)
  const [categoryIsReady, setcategoryIsReady] = useState(false)

  const [currentScore, setCurrentScore] = useState(0)

  const [hangmanFrame, setHangmanFrame] = useState(0)

  const [endOfGame, setEndOfGame] = useState('')

  const [displayCategories, setDisplayCategories] = useState(false)

  const [stretch, setStrech] = React.useState(false)

  const getRandomWord = async (language) => {

    if (!displayApp && selectedWord === '') {
      setSelectedWord('default')

      console.log(language);

      const ipcArgs = JSON.stringify({
        language: language
      })

      ipcRenderer.send('hangman-words-get-random-word', ipcArgs)

      ipcRenderer.once('hangman-words-get-random-word-reply', (event, arg) => {

        console.log(arg);

        setSelectedWord(arg.toLowerCase())
      })

      setDisplayApp(true)
    }
  }

  React.useEffect(() => {
    
    const registerKeys = e => {

      if (displayApp) {

        let currentKey
        
        if (!mobileUser) {

          currentKey = e.key.toLowerCase()
        }

        if (mobileUser) {

          if (e.key) {
            currentKey = e.key.toLowerCase()

          }
          else {

            currentKey = e.explicitOriginalTarget.nodeValue
          }
        }
        
        if (alphabet.includes(currentKey)) {
 
            setLettersRegistered([...lettersRegistered, currentKey])
           
            const audio = document.getElementsByClassName('letterIntroduced-audio-container')[0]
            audio.play()
            
            if (selectedWord.includes(currentKey)) {
              
              if (!correctLetters.includes(currentKey)) {
                
                setCorrectLetters([...correctLetters, currentKey])
                
                checkVictory(setEndOfGame)
              }
              
            }
            else {
              
              if (hangmanFrame <= 5) {
                
                setHangmanFrame(hangmanFrame + 1)
              }
              
              checkDefeat(setEndOfGame, hangmanFrame, setCorrectLetters, selectedWord, mobileUser)
            }
          }
      }
    }

    if (endOfGame === '') {
 
      window.addEventListener('keyup', registerKeys)
    }

    return () => window.removeEventListener('keyup', registerKeys)

  }, [correctLetters, displayApp, lettersRegistered, setLettersRegistered, hangmanFrame, selectedWord, mobileUser, endOfGame])

  React.useEffect(() => {

    window.addEventListener('resize', () => getWidthScreenUser(setMobileUser))

    return () => window.removeEventListener('resize', () => getWidthScreenUser(setMobileUser))
  }, [])

  React.useEffect(() => {

    RecoveryCurrentScore(setCurrentScore)
    RecoveryCurrentCategory(setCategory)
    const language = RecoveryCurrentLanguage(setLanguage)
    console.log(language);
    getWidthScreenUser(setMobileUser)

    // Get languages

    ipcRenderer.send('hangman-words-get-all-languages')

    ipcRenderer.once('hangman-words-get-all-languages-reply', (event, arg) => {

      setListOfLanguages(arg)
      let languageSelection

      if (language === '') {

        setLanguage(arg[0])
        languageSelection = arg[0]

      } else {
        languageSelection = language
      }

      // Get categories

      console.log(languageSelection)

      const ipcArgs = JSON.stringify({
        language: languageSelection
      })
  
      ipcRenderer.send('hangman-words-get-all-categories', ipcArgs)
      
      ipcRenderer.once('hangman-words-get-all-categories-reply', (event, arg) => {

        const categories = arg.map(doc => {return {text: capitalize(doc.text), image: doc.image}})
        setCategoriesList(categories)
        AdjustHeightCategories(categories, setStrech)
      })
      
      getRandomWord(languageSelection)
    })
  }, [])

  if (endOfGame) {
    
    setTimeout(() => {
        AlmacenateCurrentScore(currentScore)
        AlmacenateCategory(category)
        AlmacenateLanguage(language)

        window.location.reload(false)
        }, 3000)
  }

  return (
      <>

            <AppHeader
              language={language}

              category={category}

              displayCategories={displayCategories}
              setDisplayCategories={setDisplayCategories}
            />

            <div className="game-container">

              <div className='categories-container'>
                <Categories stretch={stretch} categories={categoriesList} languages={listOflanguages} currentScore={currentScore} displayCategories={displayCategories} AppLanguage={language} category={category} setCategory={setCategory} categoryIsReady={categoryIsReady} setLanguage={setLanguage}/>
              </div>

              <div className='column-1'>
                <Hangman
                  hangmanFrame={hangmanFrame}
                  />
              </div>
              
              <div className='column-2'>
                <CurrentScore

                  currentScore={currentScore}
                  language={language}

                />

                <Word
                  selectedWord={selectedWord}
                  correctLetters={correctLetters}
                />

              </div>

            </div>
                {
                  mobileUser ?
                    <LetterInput
                    />
                  :null
                }
                {
                  !displayApp ? <Loading /> : null
                }

                {endOfGame === 'Victory' ? <Victory currentScore={currentScore} setCurrentScore={setCurrentScore} language={language}/> : null}
                {endOfGame === 'Defeat'  ? <Defeat language={language}/> : null}

                <LettersRegistered
                  lettersRegistered={lettersRegistered}
                />
                
              <audio className="letterIntroduced-audio-container">
                <source src={introducedLetterSound} type="audio/mp3" autoPlay="true"></source>
              </audio>
        </>
  );
}

export default Game;

