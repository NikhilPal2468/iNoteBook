import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"",tags:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setNote({title:"", description:"",tags:""})
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onChange} value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" autoComplete="true"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onChange} value={note.description} name="description" className="form-control" id="description" autoComplete="true"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tag</label>
                    <input type="text" onChange={onChange} value={note.tags} name="tags" className="form-control" id="tags" autoComplete="true"/>
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
