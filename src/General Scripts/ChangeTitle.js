const ChangeTitle = (language) => {
    const titleAPP = {
        english: 'Hangman game',
        spanish: 'Ahorcado'
      }
  
      if (language === 'english') {
  
        document.title = titleAPP.english
      }
  
      if (language === 'spanish') {
  
        document.title = titleAPP.spanish
      }
}

export default ChangeTitle
