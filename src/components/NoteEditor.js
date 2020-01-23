import React, { Component } from 'react';

class NoteEditor extends Component {
  state={
    id: this.props.noteToEdit.id,
    title: this.props.noteToEdit.title,
    body: this.props.noteToEdit.body
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  clickSubmit= (evt) => {
    evt.preventDefault()
    this.props.handleSubmit(this.state)
  }

  // componentWillUnmount() {
  //   console.log("bye")
  // }
 
  render() {
    return (
      <form className="note-editor" onChange={this.handleChange} onSubmit={this.clickSubmit}>
        <input type="text" name="title" defaultValue={this.state.title}/>
        <textarea name="body" defaultValue={this.state.body}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.props.handleCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
