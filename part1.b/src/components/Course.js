import React from 'react';
import Header from 'components/Header'
import Content from 'components/Content'
import Total from 'components/Total'


const Course = (props) => {
    console.log('Hola desde Course')
    console.log(props)
    return (
        <>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts} /> 
        <Total parts={props.course.parts}/>
        </>
    )
}

export default Course