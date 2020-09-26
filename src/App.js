import React, { useState } from 'react';
import './App.css';

const App = () => {
  return (
    <div>
      <h2>Session Length</h2>
      <Session />
      <h2>Break Length</h2>
    </div>
  )
}
const Session = () => {
  const [session, setSession] = useState(25);

  const handleIncrement = () => {
    session < 60 && setSession(session + 1);
  }
  const handleDecrement = () => {
    session > 1 && setSession(session - 1);
  }
  return (
    <>
      <button onClick={handleIncrement}>+</button>
      <p>{session}</p>
      <button onClick={handleDecrement}>-</button>
    </>
  )
}


export default App;
