import React, {Component, Fragment} from 'react';
import Search from '../components/Search';
import SortContainer from '../components/SortContainer';
import PostSidebar from './PostSidebar';
import PostContent from './PostContent.js';

// const urlNote = 'http://localhost:3000/api/v1/notes'

export default class PostRoom extends Component{

    state ={
        postArr: [],
        note: null,
        newPost: {},
        search: "",
        sortValue: 'none',
    }

    componentDidMount(){
        this.setState({postArr: this.props.postArr})
    }

    // getPostedNote = () => {
    //     fetch(urlNote,{
    //         headers:{
    //             "Authorization": localStorage.token
    //         }
    //     }).then(r=>r.json())
    //     .then(noteArr => {
    //         let postArr = noteArr.filter(note => note.post === true)
    //         return this.setState({postArr})})
    // }

    handleSearch = (evt) =>{
        this.setState({
          [evt.target.name]: evt.target.value
        })
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

    handleNoteClick = (noteObj) => {
        if(this.state.note !== noteObj && !this.state.deleteClick)
          return this.setState({
            note: noteObj
          })
        return
    }  

    render(){
        console.log(this.state)
        let filter = this.state.postArr.filter(note => note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1).reverse()
        return (
          <Fragment>
            <Search search={this.state.search} handleSearch={this.handleSearch}/>
            <SortContainer handleCancel={this.handleCancel} handleSortChange={this.handleSortChange} sortValue={this.state.sortValue} sortBtn = {this.sortNoteArr}/>
            <div className='container'>
              <PostSidebar noteClick={this.handleNoteClick} postArr={filter}/>
              <PostContent noteToRender={this.state.note}/>
            </div>
          </Fragment>
        )
    }
}