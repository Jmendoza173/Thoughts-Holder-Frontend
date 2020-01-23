import React from 'react';
import NoteList from './NoteList';

const Sidebar = (props) => {
  return (
      <div className='master-detail-element sidebar'>
        <div id="newBtn"><button onClick={props.handleNew}>New</button></div>
        <NoteList allNotes={props.notesArr} noteClick={props.noteClick} 
            handleDelete={props.handleDelete}/>
      </div>
    )
}

export default Sidebar;
