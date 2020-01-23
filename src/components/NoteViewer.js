import React, { Fragment } from 'react';

const NoteViewer = (props) => {
  let {title, body} = props.renderNote
  return (
    <Fragment>
    {console.log(props)}
      <h2>{title}</h2>
      <p>{body}</p>
      <button onClick={props.editNote}>Edit</button>
      {props.renderNote.post ? null
      :
      <button onClick={()=>props.handlePost(props)}>Post</button>}
    </Fragment>
  );
}

export default NoteViewer;
