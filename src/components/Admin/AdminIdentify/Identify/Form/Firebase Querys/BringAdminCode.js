import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../../../../../Firebase/Firebase_Config';

const BringAdminCode = async () => {

    try {
        
        const db = getFirestore(firestore)
        const data = await collection(db, 'users')
        const result = await getDocs(data)

        return await result.docs.map(doc => doc.data())

    } catch (error) {

    }
}

export default BringAdminCode
