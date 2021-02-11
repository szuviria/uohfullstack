import React from 'react'

const Filter = (props) => {
    return (
        <>
        <div>
        Filter shown with 
            <input 
              value={props.filterValue}
              onChange={props.handleFilter}
             />
         </div>
      </>
    )
}

export default Filter