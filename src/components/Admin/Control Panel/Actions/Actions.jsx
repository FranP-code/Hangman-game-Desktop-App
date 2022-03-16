import React from 'react'
import AddCategory from './AddCategory/AddCategory'
import AddLanguage from './AddLanguage/AddLanguage';
import AddWord from './AddWord/AddWord'
import DeleteCategory from './DeleteCategory/DeleteCategory';
import DeleteWord from './DeleteWord/DeleteWord';
import EditWord from './EditWord/EditWord';

const Actions = ({actualAction}) => {

    return (
        <>
            {
                actualAction === 'Add Word' ?
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
            {
                actualAction === 'Add Language' ?
                    <AddLanguage action={actualAction} />
                : null
            }
        </>
    )
}

export default Actions
