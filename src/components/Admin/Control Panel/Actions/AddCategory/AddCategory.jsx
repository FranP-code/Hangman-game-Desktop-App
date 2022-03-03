import React, {useState} from 'react'
import AddCategoryToFirebase from './Firebase Querys/AddCategoryToFirebase'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import SendMeEmail from '../../Email/SendMeEmail'

const AddCategory = () => {

    const [categorySpanish, setCategorySpanish] = useState('')
    const [categoryEnglish, setCategoryEnglish] = useState('')

    const [fristWordEnglish, setFristWordEnglish] = useState('')
    const [fristWordSpanish, setFristWordSpanish] = useState('')

    const [loading, setLoading] = useState(false)
    
    const [data, setData] = useState('') 

    const addCategorySubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const result = await AddCategoryToFirebase(categoryEnglish, categorySpanish, fristWordEnglish, fristWordSpanish)
        setData(result)

        setCategoryEnglish('')
        setCategorySpanish('')

        setFristWordEnglish('')
        setFristWordSpanish('')

        setLoading(false)
        SendMeEmail('Add Category')
    }

    return (
        <>
            {
                data !== '' ?
                    <Messages data={data} />        
                : null
            }
            {
                loading ?
                    <Loading />
                :
                <div className="action-form add-category">
                    <form
                        onSubmit={e => addCategorySubmit(e)}
                    >

                        <div className="frist-row">
                            <input
                                type="text"
                                placeholder="Add the new category [English]"
                                required
                                onChange={e => setCategoryEnglish(e.target.value)}
                                value={categoryEnglish}
                            />

                            <input
                                type="text"
                                placeholder="Add one word to the new category [English]"
                                required
                                onChange={e => setFristWordEnglish(e.target.value)}
                                value={fristWordEnglish}
                            />
                        </div>

                        <div className="second-row">
                            <input
                                type="text"
                                placeholder="Add the new category [Spanish]"
                                required
                                onChange={e => setCategorySpanish(e.target.value)}
                                value={categorySpanish}
                                />

                            <input
                                type="text"
                                placeholder="Add one word to the new category [Spanish]"
                                required
                                onChange={e => setFristWordSpanish(e.target.value)}
                                value={fristWordSpanish}
                                />
                        </div>

                        <input type="submit"/>
                    </form>
                </div>
            }
        </>
    )
}

export default AddCategory
