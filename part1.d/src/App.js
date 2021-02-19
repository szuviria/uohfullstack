import React, {useState} from 'react'


const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({text, value, per}) => <tr><td>{text}:</td><td>{value}{per}</td></tr>

const Statistics = ({good, neutral, bad, allFeedbacks}) => {
  // const avg = (allFeedbacks === 0) ? 0 : (good - bad)/allFeedbacks;
  // const positive = (allFeedbacks === 0) ? 0 : ((good/allFeedbacks)*100)
  if(allFeedbacks === 0) {
    return (
      <h3>No feedback given</h3>
    )
  }

  const avg = ((good- bad)/allFeedbacks).toFixed(2)
  const positive = ((good/allFeedbacks)*100).toFixed(2)
  
  return(
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text='Good' value={good}/>
            <Statistic text='Neutral' value={neutral}/>
            <Statistic text='Bad' value={bad}/>
            <Statistic text='All' value={allFeedbacks}/>
            <Statistic text='Average' value={avg}/>
            <Statistic text='Positive' value={positive} per={'%'}/>
          </tbody>
        </table>
        {/* <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {allFeedbacks}</p>
        <p>Avergage: {avg}</p>
        <p>Positive: {positive}%</p> */}
      </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedbacks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allFeedbacks + 1)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allFeedbacks + 1)
    
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allFeedbacks + 1)   
  }


  

  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral'/>
        <Button onClick={handleBadClick} text='bad'/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} allFeedbacks={allFeedbacks}/>     
    </div>
  )


}

export default App;
