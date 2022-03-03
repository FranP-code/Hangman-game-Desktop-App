export const RecoveryCurrentScore = (setCurrentScore) => {

    if (localStorage.getItem('currentScore')) {
      
        setCurrentScore(localStorage.getItem('currentScore'))
        localStorage.removeItem('currentScore')
      }
}
