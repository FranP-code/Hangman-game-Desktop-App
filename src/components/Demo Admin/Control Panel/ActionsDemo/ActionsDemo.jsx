import React from 'react'
import AddWordDemo from './AddWordDemo/AddWordDemo'
import AddCategoryDemo from './AddCategoryDemo/AddCategoryDemo'
import DeleteCategoryDemo from './DeleteCategoryDemo/DeleteCategoryDemo'
import DeleteWordDemo from './DeleteWordDemo/DeleteWordDemo'
import EditWordDemo from './EditWordDemo/EditWordDemo'

const ActionsDemo = ({actualAction}) => {
    return (
        <>
            {
                actualAction === 'Add Word(s)' ?
                    <AddWordDemo action={actualAction} />
                : null
            }
            {
                actualAction === 'Add Category' ? 
                    <AddCategoryDemo action={actualAction} />
                : null
            }
            {
                actualAction === 'Delete Category' ? 
                    <DeleteCategoryDemo action={actualAction} />
                : null
            }
            {
                actualAction === 'Delete Word' ? 
                    <DeleteWordDemo action={actualAction} />
                : null
            }
            {
                actualAction === 'Edit Word' ? 
                    <EditWordDemo action={actualAction} />
                : null
            }
        </>
    )
}

export default ActionsDemo
