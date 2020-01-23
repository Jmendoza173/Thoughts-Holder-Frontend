import React from 'react';
import PostViewer from './PostViewer';
import Instructions from '../components/Instructions';

 const PostContent = (props) => {

    if (props.noteToRender !== null) {
      return <div className='master-detail-element detail'>
                <PostViewer renderNote={props.noteToRender}/>
            </div>
    } else {
        return <div className='master-detail-element detail'>
                     <Instructions />
                </div>
    }
}

export default PostContent