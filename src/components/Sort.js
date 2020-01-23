import React from 'react';

const Sort = (props) => {

        return <div className='btn'>
                    <label>Sort: 
                    <select value={props.sortValue} onChange={props.handleSortChange}>
                        <option defaultValue value="none">Select...</option>
                        <option value="alphabetical">Alphabetical ASC</option>
                        <option value="alphDESC">Alphabetical DESC</option>
                        <option value='created'>Most Recent</option>
                        <option value='oldest'>Oldest</option>
                        <option value='updated'>Recently Updated</option>
                    </select></label>
                    <button onClick={props.sortBtn}>Sort</button>
                    <button onClick={()=>{props.return();props.handleCancel()}}>Cancel</button>
                </div>
}

export default Sort