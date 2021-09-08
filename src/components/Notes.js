import React  from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import { NoteItem } from './NoteItem';

export const Notes = () => {
    const [note, setNote] = useState({id:"", title:"", description:"",tags:""})
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, title:currentNote.title,description:currentNote.description,tags:currentNote.tags});
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tags);
        refClose.current.click();
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    return (
        <>
        <AddNote/>
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                
            </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>
        <div className="row">
            <h2>Your Notes</h2>
            {notes.map((notes)=>{
                return <NoteItem key={notes._id} updateNote={updateNote} notes={notes}/>;
            })}
        </div>
        </>
    )
}
