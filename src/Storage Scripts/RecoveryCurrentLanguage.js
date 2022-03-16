export const RecoveryCurrentLanguage = (setLanguage) => {
    
  let language
  
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language')
    setLanguage(language)
    localStorage.removeItem('language')
    
    return language
  }

  return ''
}
