import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  let  displayNotes = () => {
    return props.allNotes.map(note => <NoteItem note={note} key={note.id} noteClick={props.noteClick} handleDelete={props.handleDelete}/>)
  }
  return (
    <ul>
      {displayNotes()}
    </ul>
  );
}

export default NoteList;
