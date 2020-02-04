import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';
import SortContainer from './SortContainer.js';
 
const urlUser = 'http://localhost:3000/api/v1/users/'
const urlNote = 'http://localhost:3000/api/v1/notes'

class NoteContainer extends Component {
  state = {
    notesArr: [],
    note: {},
    newNote: {},
    search: "",
    sortValue: 'none',
    deleteClick: false
  }
  componentDidMount(){
    this.getNotes()
  }

  getNotes=()=>{
    // const {token, loggedInUserId} = this.props
    fetch(urlUser+localStorage.loggedInUserId,{
      headers:{
        "Authorization": localStorage.token
      }
    })
    .then(r=>r.json())
    .then(notesArr => this.setState({notesArr: notesArr.notes}))
  }

  handleNoteClick = (noteObj) => {
    if(this.state.note !== noteObj && !this.state.deleteClick)
      return this.setState({
        note: noteObj
      })
    return
  }

  getNewNote = (editedNote) => {
    let notesArr = this.state.notesArr.map(note => {
      if(note.id === editedNote.id){
        return editedNote
      }
      return note
    })
    this.setState({
      notesArr: notesArr,
      note: editedNote})
  }

  handleNew = () => {
    fetch(urlNote,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization": localStorage.token
      },
      body: JSON.stringify({
        title: 'Title Here',
        body: 'Your Thoughts Here',
        user_id: localStorage.loggedInUserId
      })
    }).then(r=>r.json())
    .then(newNote => {
      this.setState({
        notesArr: [newNote, ...this.state.notesArr],
        newNote: newNote
      })
    })
  }

  handleSearch = (evt) =>{
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleDelete = (noteId) => {
    let filter = this.state.notesArr.filter(note => note.id !== noteId)
    fetch(urlNote+'/'+noteId,{
      method: 'DELETE',
      headers:{"Authorization": localStorage.token}
    })
    this.setState({notesArr: filter, note: {}, newNote: {}, deleteClick: true})
  }

  handleSortChange = (evt) => {
    this.setState({sortValue: evt.target.value})
  }

  sortNoteArr = () => {
    let sortNotes = []
    if(this.state.sortValue === "alphabetical"){
      sortNotes = this.state.notesArr.sort((a,b) => a.title.localeCompare(b.title))
      return this.setState({notesArr: sortNotes})
    }else if(this.state.sortValue === "alphDESC"){
      sortNotes = this.state.notesArr.sort((a,b) => a.title.localeCompare(b.title)).reverse()
      return this.setState({notesArr: sortNotes})
    }else if(this.state.sortValue === "created"){
      sortNotes = this.state.notesArr.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      return this.setState({notesArr: sortNotes})
    }else if(this.state.sortValue === "oldest"){
      sortNotes = this.state.notesArr.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).reverse()
      return this.setState({notesArr: sortNotes})
    }else if(this.state.sortValue === "updated"){
      sortNotes = this.state.notesArr.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      return this.setState({notesArr: sortNotes})
    }
  }
  
  handleCancel = () => {
    this.setState({sortValue: 'none'})
    return this.getNotes()
  }

  render() {
    let filter = []
    if (this.state.notesArr.length>0){
     filter = this.state.notesArr.filter(note => note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    }
    return (
      <Fragment>
        <Search search={this.state.search} handleSearch={this.handleSearch}/>
        <SortContainer changePage={this.props.changePage} handleCancel={this.handleCancel} handleSortChange={this.handleSortChange} sortValue={this.state.sortValue} sortBtn = {this.sortNoteArr}/>
        <div className='container'>
          <Sidebar noteClick={this.handleNoteClick} notesArr={filter} handleNew={this.handleNew}
              handleDelete={this.handleDelete}/>
          <Content handlePost={this.props.handlePost} noteToRender={this.state.note} getNewNote={this.getNewNote} newNote={this.state.newNote}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
