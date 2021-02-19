import React, {useState, useEffect} from 'react';
import './App.css';

const Button = ({onClick, text}) => {
  return (
    <div>
    <button onClick={onClick}>{text}</button>
    </div>
  )
}





const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.points) 
  const [vote, setVote] = useState(0)
  const index = Math.round( Math.random() * (props.anecdotes.length - 1 ))
  const points = votes
  const maxVotes = points.indexOf(Math.max(...points))
  console.log(votes)
  
  const sumVote = () => {
    setVote(vote + 1) 
  }

  useEffect(() => {
    points[selected] = vote
    setVotes(points)
  }, [points, vote, selected])

  const changeIndex = () => {
   if(index === selected) {
     if(index === props.anecdotes.length) {
       setVote(0)
       return setSelected(index - 1)
     }
     setVote(0)
     return setSelected(index + 1)
   }
    setVote(0)
    return setSelected(index)
  }
  
  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <div>
          {props.anecdotes[selected]}
        </div>
        <div> 
          {vote}
        </div> 
        <Button onClick = {sumVote} text='vote' />
        <Button onClick = {changeIndex} text='Next Anecdote'/>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>
          {props.anecdotes[maxVotes]}
        </div>
      </div>
    </div>
  )
}



export default App;
