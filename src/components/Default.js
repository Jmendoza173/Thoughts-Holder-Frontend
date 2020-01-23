import React from 'react';

const Default = (props) => {

        return <div className="btn"> <button onClick={props.renderSort}>Sort</button> 
                        <button onClick={props.handlePost}>Posted Notes</button>
                </div>
}

export default Default;