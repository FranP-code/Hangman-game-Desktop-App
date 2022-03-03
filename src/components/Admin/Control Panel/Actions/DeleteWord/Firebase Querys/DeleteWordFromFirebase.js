import { firestore } from "../../../../../../Firebase/Firebase_Config";
import { getFirestore, doc, deleteDoc, getDoc,  collection, getDocs, listDocuments } from "firebase/firestore";

const DeleteWordFromFirebase = async (language, category, word) => {
    
    try {

        const db = getFirestore(firestore)

        const categoryRef = doc(db, 'categories', category)
        const categoryFirebase = await getDoc(categoryRef)

        const categoryLocalizated = categoryFirebase.data()[language]
        
        await deleteDoc(doc(db, `hangman_words/${language}/${category}`, word))

        return await {
            sucess: true,
            message: `All Right!`
        }
        
    } catch (error) {
        
        return {
            sucess: false,
            message: `There's been an error deleting the word ${word}`
        }
    }
}

export default DeleteWordFromFirebase
