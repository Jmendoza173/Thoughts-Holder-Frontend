import React from 'react';

const NoteItem = (props) => {
  if(props.note){
    let {title, body} = props.note
    let truncated = body.split('.')
   return (
      <li onClick={()=>props.noteClick(props.note)}>
        <h2>{title}</h2>
        <p>{truncated[0]}...</p>
        <button id="delete" onClick={()=>props.handleDelete(props.note.id)}>Delete</button>
      </li>
    )
  }else{
    return (
      <li>
      </li>
  )}  
 };
export default NoteItem;
