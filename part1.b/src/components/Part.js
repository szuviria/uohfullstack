import React from 'react';

const Part = (props) => {
    console.log(props.part.name)
    return (
        <div>
             <p>
                 {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}

export default Part;