import { getDocs, getFirestore, collection } from "@firebase/firestore"
import { firestore } from "../../../../../Firebase/Firebase_Config"

import capitalize from "../../../../../General Scripts/Capilazate"

const Bring_All_Languages = async (setLanguage) => {
    
    try {
        
        const db = getFirestore(firestore)
        const data = collection(db, 'hangman_words')
        const result = await getDocs(data)

        let languages = await result.docs.map((language) => language.id)
            languages = languages.map((language) => capitalize(language, true)) 

        setLanguage(languages)
        
    } catch (error) {
    }

}

export default Bring_All_Languages
