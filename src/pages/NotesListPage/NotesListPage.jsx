import { useState, useEffect } from 'react'
import { getNotes } from '../../utilities/users-service'

import NoteCard from '../../components/NoteCard/NoteCard'
import NoteForm from '../../components/NoteForm/NoteForm'

export default function NotesListPage() {
  const [notes, setNotes] = useState([0])
  const [ascendingOrder, setAscendingOrder] = useState(true)

  // async function fetchNotes() {
  //   const allNotes = await getNotes()
  //   return allNotes
  // }


  useEffect(() => {
    const fetchNotes = async () => {
      setNotes(await getNotes())
    }

    fetchNotes()
  }, [])

  function createNotes(notes) {
    let sortedNoted
    if (ascendingOrder) {
      sortedNoted = notes.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    } else {
      sortedNoted = notes.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }
    return sortedNoted.map((note, key) => <NoteCard key={key} notes={notes} setNotes={setNotes} note={note} />)
  }

  function handleClick() {
    setAscendingOrder(!ascendingOrder)
  }
  

    return (
      <>
        <NoteForm notes={notes} setNotes={setNotes} />
        <button onClick={handleClick}>Change to {ascendingOrder ? 'Descending' : 'Ascending'} Order</button>
        <h1>Notes!</h1>
        {notes.length ? createNotes(notes) : <h1>No Notes Yet!</h1>}
      </>
    );
  }