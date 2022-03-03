import { firestore } from "../../../../../Firebase/Firebase_Config"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import AdjustHeightCategories from "../Scripts/AdjustHeightCategories";
import capitalize from "../../../../../General Scripts/Capilazate";


const Bring_All_Categories = async (setCategories, setStrech, language) => {
        
        try {

            const db = getFirestore(firestore)
            const data = await collection(db, 'categories')
            const result = await getDocs(data)

            let categories
            
            if (language === 'english') {

                categories = result.docs.map(doc => [doc.data().english, doc.data().iconRoute])
            }
            
            if (language === 'spanish') {
                categories = result.docs.map(doc => [doc.data().spanish, doc.data().iconRoute])

            }

                categories = categories.map(doc => [capitalize(doc[0], true), doc[1]])
    
            setCategories(await categories)
    
            AdjustHeightCategories(await categories, setStrech)
            
        } catch (error) {
        }
    
}

export default Bring_All_Categories
