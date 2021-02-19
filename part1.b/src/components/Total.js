import React from 'react';

const Total = (props) => {
    console.log(props)
    
     let nums = props.parts.map((element) => {
         return element.exercises
        })
        
    console.log(nums)
     let suma = nums.reduce((a,b) => a+b)
   
    return (
        <div>
            Number of excercises {suma}
        </div>
    )
}

export default Total;