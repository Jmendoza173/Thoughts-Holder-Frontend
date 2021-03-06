import React, {Component} from 'react';
import Sort from './Sort'
import Default from './Default';

export default class SortContainer extends Component{

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
            return <Default changePage={this.props.changePage} renderSort={this.renderSort}/>
        }
    }
    render(){
        return <div>
                {this.renderChoice()}
            </div>
    }
}