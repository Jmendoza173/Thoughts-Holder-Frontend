import React, {Component, Fragment} from 'react';
import Search from '../components/Search';
import PostSortContainer from './PostSortContainer';
import PostSidebar from './PostSidebar';
import PostContent from './PostContent.js';

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
      let filter = []
      if (this.state.postArr.length>0){
        console.log(this.state.postArr)
        filter = this.state.postArr.filter(note => note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1).reverse()
      }
        return (
          <Fragment>
            <Search search={this.state.search} handleSearch={this.handleSearch}/>
            <PostSortContainer changePage={this.props.changePage} handleCancel={this.handleCancel} handleSortChange={this.handleSortChange} sortValue={this.state.sortValue} sortBtn = {this.sortNoteArr}/>
            <div className='container'>
              <PostSidebar noteClick={this.handleNoteClick} postArr={filter}/>
              <PostContent noteToRender={this.state.note}/>
            </div>
          </Fragment>
        )
    }
}