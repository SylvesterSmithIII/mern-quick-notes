import { useState } from 'react'
import { addNote } from '../../utilities/users-service'


export default function NoteForm({ notes, setNotes }) {
    const [formData, setFormData] = useState({
        text: ''
    })

    function handleChange(e) {
        setFormData({ [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const note = await addNote(formData)
        setNotes([...notes, note])
        setFormData({
            text: ''
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Text:</label>
            <input type="text" name="text" value={formData.text} onChange={handleChange} />
            <button type='submit'>Create Note!</button>
        </form>
    )
}