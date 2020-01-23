import React, { Component } from 'react';
import Header from './Header';
import NoteContainer from './NoteContainer';
import LogIn from './LogIn'
import PostRoom from "../postComponents/PostRoom";

const urlNote = 'http://localhost:3000/api/v1/notes'

class App extends Component {
  state = {
    loggedInUserId: null,
    token: null,
    name: "",
    postNote: false,
    postArr: []
  }

  componentDidMount(){
    this.setState({
      loggedInUserId: localStorage.loggedInUserId,
      token: localStorage.token
    })
    this.getPostedNote()
  }

  getPostedNote = () => {
    fetch(urlNote,{
        headers:{
            "Authorization": localStorage.token
        }
    }).then(r=>r.json())
    .then(noteArr => {
        let postArr = noteArr.filter(note => note.post === true)
        return this.setState({postArr})})
  }


  setToken = (token, userId) => {
    console.log("getting token",token,userId)
    localStorage.token = token
    localStorage.loggedInUserId = userId
    this.setState({
      token: token,
      loggedInUserId: userId
    })
  }

  handleLogOut = () => {
    localStorage.clear()
    this.setState({
      token: null,
      loggedInUserId: null,
      name: ""
    })
  }

  handlePost=(note)=>{
    console.log(note.renderNote.id)
    this.setState({postNote: true})
    fetch(`http://localhost:3000/api/v1/notes/${note.renderNote.id}`,{
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json',
         Accept: 'application/json',
        "Authorization": localStorage.token},
        body: JSON.stringify({post: true})
      }).then(r=>r.json()).then(noteToPost => this.setState({postArr: [noteToPost,...this.state.postArr]}))
  }

  changePage=()=>{
    this.setState({postNote: !this.state.postNote})
  }
  renderContent = () => {
      if(this.state.token){
        if(this.state.postNote){
         return( <div className="app">
            <Header message="Posted Thoughts Viewer"/>
            <PostRoom changePage={this.changePage} postArr={this.state.postArr}/>
            </div>)
        }else{
          return(<div className="app">
            <Header message="Your Thoughts Notes" handleLogOut={this.handleLogOut}/> 
            <NoteContainer changePage={this.changePage} handlePost={this.handlePost}/>
            </div>)
        }
      }else{
        return (
          <div className="app">
          <Header message="Welcome to Thoughts Holder"/>
          <LogIn setToken={ this.setToken } />
          </div>
        )
      }
  }

  render() {
    return this.renderContent()
  }
}

export default App;
