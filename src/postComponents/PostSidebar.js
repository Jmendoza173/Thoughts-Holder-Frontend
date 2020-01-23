import React from 'react';
import PostList from './PostList';

const PostSidebar = (props) => {
    return (
      <div className='master-detail-element sidebar'>
        <div id="newBtn"><h2>All Posted Notes</h2></div>
        <PostList allNotes={props.postArr} noteClick={props.noteClick}/>
      </div>
    );
}

export default PostSidebar;