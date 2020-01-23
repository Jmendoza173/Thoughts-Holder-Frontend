import React from 'react';
import PostItem from './PostItem';

const PostList = (props) => {
  let  displayNotes = () => {
    return props.allNotes.map(note => <PostItem note={note} key={note.id} noteClick={props.noteClick}/>)
  }
  return (
    <ul>
      {displayNotes()}
    </ul>
  );
}

export default PostList;