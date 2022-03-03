import {firestore} from '../../../../../../Firebase/Firebase_Config'
import {getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import NormalizeFormsInput from '../../Scripts/NormalizeFormsInput';

const AddCategoryToFirebase = async (englishCategory, spanishCategory, fristWordEnglish, fristWordSpanish) => {

    englishCategory = NormalizeFormsInput(englishCategory)
    spanishCategory = NormalizeFormsInput(spanishCategory)

    fristWordEnglish = NormalizeFormsInput(fristWordEnglish)
    fristWordSpanish = NormalizeFormsInput(fristWordSpanish)

    try {
        
        const db = getFirestore(firestore)
        
        //! Add categories to 'categories'
        await setDoc(doc(db, 'categories', englishCategory), {

            english: englishCategory,
            spanish: spanishCategory
        })

        //! Add category english to hangman_words/english
        await setDoc(doc(db, `hangman_words/english/${englishCategory}`, fristWordEnglish), {
            'FRIST_CATEGORY_FIELD': 'FRIST_CATEGORY_VALUE'
        })

        //! Add category spanish to hangman_words/spanish
        await setDoc(doc(db, `hangman_words/spanish/${spanishCategory}`, fristWordSpanish), {
            'FRIST_CATEGORY_FIELD': 'FRIST_CATEGORY_VALUE'
        })

        return {
            sucess: true,
            message: 'Category added to the database'
        }

    } catch (error) {

        return {
            sucess: false,
            message: `There's been an error...`
        }
    }
}

export default AddCategoryToFirebase
