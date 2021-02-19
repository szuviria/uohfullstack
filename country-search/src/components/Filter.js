import React from 'react'

const Filter = (props) => {

    return (
        
        <div>
            
            <h3>Search Country</h3>
            
            <input 
               value={props.filterValue}
               onChange={props.handleFilter}
            />
        </div>
        
    )
}

export default Filter