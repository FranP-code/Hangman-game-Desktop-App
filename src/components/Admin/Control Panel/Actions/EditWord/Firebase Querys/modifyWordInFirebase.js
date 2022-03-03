import { getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../../../../../Firebase/Firebase_Config";

const modifyWordInFirebase = async (language, category, word, newWord) => {
    
    try {

        const db = getFirestore(firestore)
        const deleteDocResult = await deleteDoc(doc(db, `hangman_words/${language}/${category}`, word))

        const addDocResult = await setDoc(doc(db, `hangman_words/${language}/${category}`, newWord), {

            'OBLIGATORY_FIELD': 'OBLIGATORY_DATA'
        })

        return {

            sucess: true,
            message: `All Right!`
        }
        
    } catch (error) {
        
        return {

            sucess: false,
            message: `There's been an error modificating the word`
        }
    }
}

export default modifyWordInFirebase
