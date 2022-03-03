import { doc, getDoc, getDocs, getFirestore, collection } from "firebase/firestore";
import { firestore } from "../../../../../Firebase/Firebase_Config"


const bringNameOfEmail = async (email) => {

    try {

        const id = email

        const db = getFirestore(firestore)
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        return await docSnap.data()
        
    } catch (error) {

    }
}

export default bringNameOfEmail
