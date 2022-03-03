export const RecoveryCurrentLanguage = (setLanguage) => {
    
    if (localStorage.getItem('language')) {

        setLanguage(localStorage.getItem('language'))
        localStorage.removeItem('language')
      }
}
