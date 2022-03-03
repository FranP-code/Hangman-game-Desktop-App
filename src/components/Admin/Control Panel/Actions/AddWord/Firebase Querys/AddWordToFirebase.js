import {firestore} from '../../../../../../Firebase/Firebase_Config'
import {getFirestore, collection, doc, setDoc } from "firebase/firestore";

const AddWordToFirebase = async (language, category, word, setData) => {
    
        
    try {
        const db = await getFirestore(firestore)
        const result = await setDoc(doc(db,  `hangman_words/${language}/${category}`, word), {

            'WORD_FIELD': 'WORD_VALUE'
        })

        setData({
            sucess: true,
            message: 'All right!'
        })
        
        return true

    } catch (error) {

        setData({
            sucess: false,
            message: `There's been an error adding the words`
        })

        return 'error'
    }
};


export default AddWordToFirebase
