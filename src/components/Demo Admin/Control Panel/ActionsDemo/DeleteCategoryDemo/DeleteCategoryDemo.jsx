import React from 'react'
import capitalize from '../../../../Admin/Control Panel/Scripts/Capilazate'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'
import DemoMessage from '../../DemoMessage/DemoMessage'

const DeleteCategoryDemo = () => {
    const [categoriesList, setCategoriesList] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const [categorySelection, setCategorySelection] = React.useState(false)
    const [data, setData] = React.useState(false)

    const [changedTheFirebaseCategories, setChangedTheFirebaseCategories] = React.useState(true)

    const [message, setMessage] = React.useState(false)

    const BringCategoriesToThisComponent = async () => {

        const result = await ['Category A', 'Category B', 'Category C']
        setCategoriesList(result)
        setLoading(false)

    }

    const submitDeleteCategory = async (e) => {

        e.preventDefault()
        setLoading(true)
        
        if (!categorySelection || categorySelection === 'default') {

            setData({
                sucess: false,
                message: 'The category is empty'
            })

            return
        }

        const answer = window.confirm(`Are you sure?, this is gonna delete all words in ${capitalize(categorySelection)}'s category`) //! CREDITS: https://stackoverflow.com/a/9334679

        if (answer) {

            setData({
                sucess: true,
                message: `All Right!`
            })
        }

        setCategorySelection('')
        setLoading(false)

        setChangedTheFirebaseCategories(true)
        setMessage(true)
        //SendMeEmail('Delete Category')
    }

    React.useEffect(() => {

        if (changedTheFirebaseCategories) {
   
            BringCategoriesToThisComponent()
            setChangedTheFirebaseCategories(false)
        }

    }, [changedTheFirebaseCategories])

    return (
        <>
            {
                data ?
                    <Messages data={data} />        
                : null
            }
            {
                loading ?
                    <Loading />
                :
                <div className="action-form delete-category">
                    <form
                        onSubmit={(e) => submitDeleteCategory(e)}
                    >
                        <select
                            onChange={e => setCategorySelection(e.target.value)}
                            value={categorySelection}
                        >
                            <option value='default'>Select an option</option>
                            {
                                categoriesList.map(category => <option key={category} value={category}>{capitalize(category)}</option>)
                            }
                        </select>
                        <input type="submit" value="Delete"/>
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

export default DeleteCategoryDemo
