import React from 'react';

const Total = (props) => {
    console.log(props)
    
    let nums = props.total.map((element) => {
        return element.exercises
        })

    let suma = nums.reduce((a,b) => a+b)
   
    return (
        <div>
            Number of excercises {suma}
        </div>
    )
}

export default Total;