import React, {useState} from 'react'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import DemoMessage from '../../DemoMessage/DemoMessage'

const AddCategoryDemo = () => {
    const [categorySpanish, setCategorySpanish] = useState('')
    const [categoryEnglish, setCategoryEnglish] = useState('')

    const [fristWordEnglish, setFristWordEnglish] = useState('')
    const [fristWordSpanish, setFristWordSpanish] = useState('')

    const [loading, setLoading] = useState(false)
    
    const [data, setData] = useState('') 

    const [message, setMessage] = useState(false)

    const addCategorySubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const result = await {
            sucess: true, 
            message: 'All Right!'
        }
        setData(result)

        setCategoryEnglish('')
        setCategorySpanish('')

        setFristWordEnglish('')
        setFristWordSpanish('')

        setLoading(false)
        setMessage(true)
        ////SendMeEmail('Add Category')
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
            {
                message ?
                    <DemoMessage setMessage={setMessage}/>
                : null
            }
        </>
    )
}

export default AddCategoryDemo
