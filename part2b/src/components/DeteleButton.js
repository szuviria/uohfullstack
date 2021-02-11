import React from 'react'

const DeleteButton = ({ id, name, handleDeletePerson }) => {
    return (
        <div>
            <button 
                onClick={handleDeletePerson} 
                id={id}
                name={name}
                >
                Delete
            </button>
        </div>
    )   
}

export default DeleteButton