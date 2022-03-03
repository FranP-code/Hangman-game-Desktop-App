import {firestore} from '../Firebase/Firebase_Config'
import { getFirestore, collection, doc, getDocs, getDoc } from 'firebase/firestore/lite';

const GetRandomCategory = async (language) => {


    let categoriesList = []

        try {

            const db = getFirestore(firestore)
            const data = collection(db, `categories`)
            const result = await getDocs(data)

            result.docs.map(doc => categoriesList.push(doc.get(language)))

            const randomNumber = Math.trunc(

                Math.random() * (categoriesList.length - 0) + 0
            )
            
            return categoriesList[randomNumber].toLowerCase()

        } catch (error) {
        }
}

export default GetRandomCategory
