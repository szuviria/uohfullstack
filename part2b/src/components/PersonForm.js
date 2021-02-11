import React from 'react'

const PersonForm = (props) => {
    return (
        <>
        <form onSubmit={props.addPerson}>
        <div>
          name: <input 
                    value={props.newName}
                    onChange={props.handleNewName}
                />
        </div>
        <div>
          number: <input 
                  value={props.newNum}
                  onChange={props.handleNewNum}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
}

export default PersonForm