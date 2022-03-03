import React from 'react'
import AddCategory from './AddCategory/AddCategory'
import AddWord from './AddWord/AddWord'
import DeleteCategory from './DeleteCategory/DeleteCategory';
import DeleteWord from './DeleteWord/DeleteWord';
import EditWord from './EditWord/EditWord';

const Actions = ({actualAction}) => {

    return (
        <>
            {
                actualAction === 'Add Word(s)' ?
                    <AddWord action={actualAction} />
                : null
            }
            {
                actualAction === 'Add Category' ? 
                    <AddCategory action={actualAction} />
                : null
            }
            {
                actualAction === 'Delete Category' ? 
                    <DeleteCategory action={actualAction} />
                : null
            }
            {
                actualAction === 'Delete Word' ? 
                    <DeleteWord action={actualAction} />
                : null
            }
            {
                actualAction === 'Edit Word' ? 
                    <EditWord action={actualAction} />
                : null
            }
        </>
    )
}

export default Actions
