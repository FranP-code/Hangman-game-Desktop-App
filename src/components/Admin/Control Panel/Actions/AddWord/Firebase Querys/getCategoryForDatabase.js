import { getFirestore, doc, deleteDoc, getDoc,  collection, getDocs, listDocuments } from "firebase/firestore";
import { firestore } from "../../../../../../Firebase/Firebase_Config"

const getCategoryForDatabase = async (categorySelection, LanguageSelection) => {
    
    try {
        const db = getFirestore(firestore)

        const categoryRef = doc(db, 'categories', categorySelection)
        const categoryFirebase = await getDoc(categoryRef)

        const categoryLocalizated = categoryFirebase.data()[LanguageSelection]

        return await categoryLocalizated
        console.log(categoryLocalizated)
        
    } catch (error) {
        
    }
}

export default getCategoryForDatabase
