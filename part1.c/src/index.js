import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import Display from './components/Display'
import Button from './components/Button';



const App = () => {
  const [counter, setCounter] = useState(0)

  // const handleClick = () => {
  //   console.log('clicked')
  // }

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter = {counter} />
      <Button handleClick = {increaseByOne}
              text = 'plus' />
      <Button handleClick = {setToZero}
              text = 'reset' />
      <Button handleClick = {decreaseByOne}
              text = 'minus' />        
    </div>
    
  )
}





ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);






