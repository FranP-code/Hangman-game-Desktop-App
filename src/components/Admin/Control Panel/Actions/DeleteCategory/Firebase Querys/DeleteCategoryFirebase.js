import { firestore } from "../../../../../../Firebase/Firebase_Config";
import { getFirestore, doc, deleteDoc, getDoc,  collection, getDocs, listDocuments } from "firebase/firestore";

const DeleteCategoryFirebase = async (category, setData) => {
    
    try {

        const db = getFirestore(firestore)
        
        // const categoryEnglishRef  = await doc(db, 'categories', category)
        // const categoryEnglishSnap = await getDoc(categoryEnglishRef)
        // const categoryEnglish     = categoryEnglishSnap.data()['english'].toLowerCase()

        // const categorySpanishRef  = await doc(db, 'categories', category)
        // const categorySpanishSnap = await getDoc(categorySpanishRef)
        // const categorySpanish     = categorySpanishSnap.data()['spanish'].toLowerCase()

        // console.log(categoryEnglish)
        // console.log(categorySpanish)

        // const collectionWordsCategoryEnglish = await collection(db, `hangman_words/english/${categoryEnglish}`)
        // const wordsCategoryEnglishRef = await getDocs(collectionWordsCategoryEnglish)
        // const wordsCategoryEnglish = await wordsCategoryEnglishRef.docs

        // console.log(wordsCategoryEnglish)

        // const deleteWordsCategoryEnglishPromise  = new Promise((resolve, reject) => {

        //     wordsCategoryEnglish.forEach(async (documentInCategory, index) => {

        //         console.log(await documentInCategory.id)
        //         await deleteDoc(doc(db, `hangman_words/english/${categoryEnglish}`, documentInCategory.id))

        //         if (index === wordsCategoryEnglish.length -1) resolve();
        //     })
        // })

        // deleteWordsCategoryEnglishPromise.then(() => {
        //     deleteDoc(doc(db, `hangman_words/english/`, categoryEnglish))
        // })

        await deleteDoc(doc(db, 'categories', category))
        
    } catch (error) {

        setData({
            sucess: false,
            message: `There's been an error deleting the category ${category}`
        })
        
    }
}

export default DeleteCategoryFirebase
