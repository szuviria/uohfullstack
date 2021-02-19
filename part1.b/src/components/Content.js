import React from 'react';
import Part from './Part';

const Content = (props) => {
    const parts = props.parts
    return (

        parts.map((part) =>(
            <Part key={part.id} part={part} />
        ))
        // <div>
        // <Part  part={props.parts[0]}/>
        // <Part  part={props.parts[1]}/>
        // <Part  part={props.parts[2]}/>
        // </div>
    )
}

export default Content;