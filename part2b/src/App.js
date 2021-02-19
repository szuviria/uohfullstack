import React, { useState, useEffect } from 'react'
import Person from 'components/Person'
import PersonForm from 'components/PersonForm'
import Filter from 'components/Filter'
import personService from 'services/persons'
import DeleteButton from 'components/DeteleButton'
import Notification from 'components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filterValue, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ errorMessage, setErrorMessage] = useState({message: null, className: null})

  useEffect(() => {
    setFilteredPersons(persons) 
  }, [persons])

  useEffect(() => {
    // console.log('Effect axios')
    personService
      .getAll()
      .then(initialPersons => {
        // console.log(res.data)
        setPersons(initialPersons)
      })
  }, [])
  

  const addPerson = (e) =>{
      e.preventDefault()
      const copyNewName= newName
      const newNameFormated = (copyNewName.trim().charAt(0).toUpperCase()) + copyNewName.trim().slice(1)
      const foundPerson = persons.find(person => person.name === newNameFormated)

      if(!foundPerson){
         const personObject = {
            name: newNameFormated,
            number: newNum
        }

        personService
          .createPerson(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNum('') 
            setErrorMessage({message: `Added ${newPerson.name}`, className: 'added'})
            setTimeout(() => {
              setErrorMessage({message: null, className: null})
            }, 3000)
          })
          .catch(error => {
            console.log(newNameFormated)
            //If para mensaje
            setErrorMessage({message: error.response.data.error, className: 'error'})
            setTimeout(() => {
              setErrorMessage({message: null, className: null})
            }, 3000)
            setNewName('')
            setNewNum('')
          })

   
      } 
      else {
        if(window.confirm(`${newNameFormated} is already added to phonebook, replace the old number with a new one?`)){
          const changedPerson = {...foundPerson, number: newNum}

          personService
            .updatePerson(changedPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson ))
              setErrorMessage({message: `Information of ${updatedPerson.name} has been updated`, className: 'added'})
              setTimeout(() => {
                setErrorMessage({message: null, className: null})
              }, 3000)
            })
            .catch(error => {  
              // const prevPersons = [...persons]
              // const indexPerson = prevPersons.findIndex(person => parseInt(person.id) === parseInt(changedPerson.id))
              // prevPersons.splice(indexPerson, 1)

              setErrorMessage({message: error.response.data.error, className: 'error'})
              // setPersons(prevPersons)
              setTimeout(() => {
                setErrorMessage({message: null, className: null})
              }, 3000)
              
              setNewNum('')
              setNewName('')
            })
            setNewName('')
            setNewNum('')
        } else {
        setNewName('')        
        }
      }   
      
      
  }

  const handleDeletePerson = (e) => {
    const prevPersons = [...persons]
    const indexPerson = prevPersons.findIndex(person => parseInt(person.id) === parseInt(e.target.id))
    
    if(window.confirm(`Do you really want delete ${e.target.name}?`)){
     personService
        .deletePerson(e.target.id)
        .then(() => {
          setErrorMessage({message: `Information of ${e.target.name} has been deleted`, className: 'error'})
          setTimeout(() => {
            setErrorMessage({message: null, className: null})
          }, 3000)
            prevPersons.splice(indexPerson, 1)
            setPersons(prevPersons)
           
        })
        .catch(err => {  
          const prevPersons = [...persons]
          const indexPerson = prevPersons.findIndex(person => parseInt(person.id) === parseInt(e.target.id))      
          setErrorMessage({message: `Information of ${prevPersons[indexPerson].name} has already been removed from server`, className: 'error'})
          prevPersons.splice(indexPerson, 1)
          setPersons(prevPersons)
          setTimeout(() => {
            setErrorMessage({message: null, className: null})
          }, 3000)
          
          setNewName('')
          setNewNum('')
        })
      }  

  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const expresion = new RegExp(e.target.value.toLowerCase())
    const filtered = persons.filter(person => {
      return person.name.replace(/\s/g, " ").toLowerCase().search(expresion) !== -1 
    })
    
    setFilteredPersons(filtered)
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNum = (e) => {
    setNewNum(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage.message} className={errorMessage.className}/>
      <Filter 
          filterValue={filterValue}
          handleFilter={handleFilter}
        />
      <h3>Add New</h3>
        <PersonForm 
            addPerson={addPerson}
            newName={newName}
            handleNewName={handleNewName}
            newNum={newNum}
            handleNewNum={handleNewNum}
        />
      <h3>Numbers</h3>
      <div>
        {filteredPersons.map((person) => 
          <div key={person.id}>
          <Person key={person.name} data={person}/>
          <DeleteButton 
              key={person.id} 
              id={person.id} 
              name={person.name}
              handleDeletePerson={handleDeletePerson}/>
          </div>
          )}
      </div>
    </div>
  )
}

export default App