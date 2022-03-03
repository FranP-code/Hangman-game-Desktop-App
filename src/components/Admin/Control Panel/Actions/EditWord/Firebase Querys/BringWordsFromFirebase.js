import { collection, getDocs } from "firebase/firestore/lite"
import { getFirestore } from "firebase/firestore/lite"
import { firestore } from "../../../../../../Firebase/Firebase_Config"

const BringWordsFromFirebase = async (language, category) => {

    try {

        const db = getFirestore(firestore)
        const collectionOfWords = await collection(db, `hangman_words/${language}/${category}`)
        const data = await getDocs(collectionOfWords)

        const result = await data.docs.map(word => word.id)

        return result
        
    } catch (error) {
        
    }
}

export default BringWordsFromFirebase
