import React, {Component} from 'react';
import Sort from '../components/Sort'
// import Default from './Default';

export default class PostSortContainer extends Component{

    state = {
        sort: false
    }
    renderSort = () =>{
        this.setState({sort: true})
    }
    returnFromSort = () => {
        this.setState({sort: false})
    }

    renderChoice = () => {
        if(this.state.sort){
            return <Sort sortBtn={this.props.sortBtn} return={this.returnFromSort} handleCancel={this.props.handleCancel} handleSortChange={this.props.handleSortChange} sortValue={this.props.sortValue}/>
        }else{
            return <div className="btn"> <button onClick={this.renderSort}>Sort</button> 
                    <button onClick={this.props.changePage}>My Thought</button>
                    </div>
        }
    }
    render(){
        return <div>
                {this.renderChoice()}
            </div>
    }
}