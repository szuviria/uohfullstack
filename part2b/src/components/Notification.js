import React from 'react'

const Notification = ({message, className}) => {
  
   const classFun = () => {
     if(className === 'added'){
       return {
         color: 'green',
         background: 'lightgrey',
         fontSize: 20,
         borderStyle: 'solid',
         borderRadius: 5,
         padding: 10,
         marginBottom:10
       }
     } else if (className === 'error'){
       return {
         color: 'red',
         background: 'lightgrey',
         fontSize: 20,
         borderStyle: 'solid',
         borderRadius: 5,
         padding: 10,
         marginBottom:10
       }
     }
   }

   const style = classFun()

     if (message === null) {
       return null
     }
  
     return (
       <div style={style}>
         {message}
       </div>
     )
  }

export default Notification