import React, { useState, useEffect } from 'react'
import Note from 'components/Note'
import noteService from 'services/notes'
import Notification from 'components/Notification'
import Footer from 'components/Footer'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // console.log(notes)

  const hook = () =>{
    // console.log('Effect')
    noteService
      .getAll()
      .then (initialNotes => {
        // console.log('Promise Fulfilled')
        setNotes(initialNotes)
      })
  }
  
  useEffect(hook, [])

  // console.log('render', notes.length, 'notes')
  
  
  const addNote = (e) => {
    e.preventDefault()
    // console.log('Click en el boton', e.target)
    const noteObjet = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObjet)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

    

  }

  const handleNoteChange = (e) => {
    // console.log(e.target.value)
    setNewNote(e.target.value)
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    
  // notesToShow = notesToShow 
  // ? notesToShow
  // : [ {content: 'No hay notas', id:1}]
  // console.log(notesToShow)

  const toggleImportanceOf = (id) => {
    console.log(`Importance of ${id} needs to be toggled`)
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(err => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })

  } 

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} 
                  note={note} 
                  toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
          
      </ul>
      <form onSubmit={addNote}>
        <input 
              value={newNote}
              onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
