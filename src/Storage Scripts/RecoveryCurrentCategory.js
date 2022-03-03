export const RecoveryCurrentCategory = (setCategory) => {
    
    if (localStorage.getItem('category')) {

      const category = localStorage.getItem('category')

      setCategory(category)
      localStorage.removeItem('category')

      if (localStorage.getItem('category') === 'false') {

        //setCategory(false)
      }

      }
}
