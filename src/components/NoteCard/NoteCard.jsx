import { deleteNote } from '../../utilities/users-service'

export default function NoteCard({ notes, setNotes, note }) {
    function handleClick() {
        deleteNote(note)
        const updatedNotes = notes.filter(originalNote => originalNote !== note)
        setNotes(updatedNotes)
    }

    return (
        <div>
            <p>{note.text}</p>
            <h6>{note.createdAt?.toLocaleString()}</h6>
            <button onClick={handleClick}>Delete Note</button>
            <hr />
        </div>
    )
}