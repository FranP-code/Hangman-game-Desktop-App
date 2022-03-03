import {firestore} from '../../../../../../Firebase/Firebase_Config'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const BringCategories = async () => {
    
    try {

        const db = getFirestore(firestore)
        const data = await collection(db, 'categories')
        const result = await getDocs(data)
                
        const categories = await result.docs.map(doc => doc.data().english)

        return await categories
            
    } catch (error) {
    }
}

export default BringCategories
