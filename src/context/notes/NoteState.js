import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Fetch all notes
  const getNotes = async ()=>{
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDdlMWQzZjMwMjNkYWU2ZmVhMDYzIn0sImlhdCI6MTYzMDgzMjg1NX0.zlcgQ0B4ZvFSlDmpZb0AMDqFq6lAJcS5yMnlCEenvnY',
      }
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(json)
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tags)=>{
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDdlMWQzZjMwMjNkYWU2ZmVhMDYzIn0sImlhdCI6MTYzMDgzMjg1NX0.zlcgQ0B4ZvFSlDmpZb0AMDqFq6lAJcS5yMnlCEenvnY',
      },
      body: JSON.stringify({title, description, tags}) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(json))
  }
  // delete a note
  const deleteNote = async (id)=>{
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDdlMWQzZjMwMjNkYWU2ZmVhMDYzIn0sImlhdCI6MTYzMDgzMjg1NX0.zlcgQ0B4ZvFSlDmpZb0AMDqFq6lAJcS5yMnlCEenvnY',
      }
    });
    getNotes()
  }
  // edit a note
  const editNote = async (id, title, description, tags)=>{
    // Api call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDdlMWQzZjMwMjNkYWU2ZmVhMDYzIn0sImlhdCI6MTYzMDgzMjg1NX0.zlcgQ0B4ZvFSlDmpZb0AMDqFq6lAJcS5yMnlCEenvnY',
      },
      body: JSON.stringify({title, description, tags}) // body data type must match "Content-Type" header
    });
    // const json = await response.json(); // parses JSON response into native JavaScript objects
    //Logic to edit
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if(element._id === id)
      {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
    setNotes(newNotes);
    // getNotes();
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
