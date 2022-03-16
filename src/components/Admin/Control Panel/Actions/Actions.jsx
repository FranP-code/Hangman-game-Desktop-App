import React from 'react'
import AddCategory from './AddCategory/AddCategory'
import AddLanguage from './AddLanguage/AddLanguage';
import AddWord from './AddWord/AddWord'
import DeleteCategory from './DeleteCategory/DeleteCategory';
import DeleteWord from './DeleteWord/DeleteWord';
import EditWord from './EditWord/EditWord';

const Actions = ({actualAction, demo}) => {

    return (
        <>
            {
                actualAction === 'Add Word' ?
                    <AddWord action={actualAction} demo={demo}/>
                : null
            }
            {
                actualAction === 'Add Category' ? 
                    <AddCategory action={actualAction} demo={demo}/>
                : null
            }
            {
                actualAction === 'Delete Category' ? 
                    <DeleteCategory action={actualAction} demo={demo}/>
                : null
            }
            {
                actualAction === 'Delete Word' ? 
                    <DeleteWord action={actualAction} demo={demo}/>
                : null
            }
            {
                actualAction === 'Edit Word' ? 
                    <EditWord action={actualAction} demo={demo}/>
                : null
            }
            {
                actualAction === 'Add Language' ?
                    <AddLanguage action={actualAction} demo={demo}/>
                : null
            }
        </>
    )
}

export default Actions
