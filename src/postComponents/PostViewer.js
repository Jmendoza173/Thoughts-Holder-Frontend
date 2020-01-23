import React, { Fragment } from 'react';

const PostViewer = (props) => {
  let {title, body} = props.renderNote
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{body}</p>
    </Fragment>
  );
}

export default PostViewer;