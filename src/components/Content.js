import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

const url = 'http://localhost:3000/api/v1/notes/'
/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  state = {
    editClick: false,
    noteId: "",
  }

  handleEdit = () => {
    this.setState({
      editClick: true,
      noteId: this.props.noteToRender.id
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.noteToRender.id !== this.props.noteToRender.id){
      this.setState({editClick: false})
    }
  }

  handleSubmit = (noteObj) => {
    console.log(noteObj)
    fetch(url+noteObj.id,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization": localStorage.token
      },
      body: JSON.stringify({
        title: noteObj.title,
        body: noteObj.body
      })
    }).then(r=>r.json())
    .then(currentNote => {
      this.props.getNewNote(currentNote)
    })

  }

  handleCancel = () => {
    this.setState({
      editClick: false
    })
  }

  renderContent = () => {
    // console.log(this.props.currentNote)
    if (this.state.editClick) {
      return <NoteEditor noteToEdit = {this.props.noteToRender} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>;
    } else if (Object.keys(this.props.noteToRender).length !== 0) {
      return <NoteViewer handlePost={this.props.handlePost} renderNote={this.props.noteToRender} editNote={this.handleEdit} />
    } else if (Object.keys(this.props.newNote).length !== 0) {
      return <NoteEditor noteToEdit = {this.props.newNote} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
    } else {
      return <Instructions />
    }
  }
  
  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
