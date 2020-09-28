import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [session, setSession] = useState(25);
  const [breaking, setBreaking] = useState(5);

  let min = session;
  let s = 10;
  let sw = true;
  let inter;

  const handleClock = () => {
    let clock = document.getElementById('clock');
    inter = setInterval(() => {
      if (s === 0) {
        s = 10;
        if (min === 0) {
          min = sw ? breaking : session;
          sw = !sw;
        } else {
          min--;
        }
      }
      s--;
      let m = min < 10 ? '0' + min : min;
      let ss = s < 10 ? '0' + s : s;
      clock.innerText = m + ':' + ss;
    }, 1000);
  }
  const Restart = () => {
    let clock = document.getElementById('clock');
    clearInterval(inter);
    setSession(25);
    setBreaking(5);
    clock.innerText = session + ':00';
  }

  return (
    <div>
      <h2>Session Length</h2>
      <Session session={session} setSession={setSession} />
      <h2>Break Length</h2>
      <Breaking breaking={breaking} setBreaking={setBreaking} />
      <div id='clock'>
        {(sw) ? session + ':00' : breaking + ':00'}
      </div>
      <div>
        <button onClick={handleClock}>Play</button>
        <button onClick={Restart}>Restart</button>
      </div>
    </div>
  )
}
const Session = ({ session, setSession }) => {

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

const Breaking = ({ breaking, setBreaking }) => {
  const handleIncrement = () => {
    breaking < 60 && setBreaking(breaking + 1);
  }
  const handleDecrement = () => {
    breaking > 1 && setBreaking(breaking - 1);
  }
  return (
    <>
      <button onClick={handleIncrement}>+</button>
      <p>{breaking}</p>
      <button onClick={handleDecrement}>-</button>
    </>
  )
}



export default App;
