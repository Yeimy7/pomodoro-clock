import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [session, setSession] = useState(25);
  const [breaking, setBreaking] = useState(5);


  let inter;
  let min = session-1;
  let s = 60;
  let sw = true;
  let sw2 = true;

  const titlee = document.getElementById('timer-label');

  const handleClock = () => {
    if (sw2) {
      let clock = document.getElementById('time-left');
      inter = setInterval(() => {
        
        if (s === 0) {
          s = 60;
          min--;
          if (min < 0) {
            if (sw) {
              min = breaking-1;
              titlee.innerText = 'Break';
            } else {
              min = session-1;
              titlee.innerText = 'Session';
            }
            sw = !sw;
          } 
        }
        s--;
        let m = min < 10 ? '0' + min : min;
        let ss = s < 10 ? '0' + s : s;
        clock.innerText = m + ':' + ss;
      }, 1000);
    } else {
      clearInterval(inter);
    }
    sw2 = !sw2;
  }
  const Restart = () => {
    const titlee = document.getElementById('timer-label');
    let clock = document.getElementById('time-left');
    titlee.innerText = 'Session';
    clearInterval(inter);
    min = session-1;
    s = 60;
    sw = true;
    setSession(25);
    setBreaking(5);
    clock.innerText = session + ':00';
  }

  return (
    <div>
      <h2 id='session-label'>Session Length</h2>
      <Session session={session} setSession={setSession} />
      <h2 id='break-label'>Break Length</h2>
      <Breaking breaking={breaking} setBreaking={setBreaking} />
      <div id="timer-label">
        Session
      </div>
      <div id="time-left">
        {(sw) ? (session<10)? '0'+session + ':00':session + ':00' : (breaking<10)? '0'+breaking + ':00':breaking + ':00' }
      </div>
      <div>
        <button id="start_stop" onClick={handleClock}>Play</button>
        <button id="reset" onClick={Restart}>Restart</button>
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
      <button id="session-increment" onClick={handleIncrement}>+</button>
      <p id="session-length">{session}</p>
      <button id="session-decrement" onClick={handleDecrement}>-</button>
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
      <button id="break-increment" onClick={handleIncrement}>+</button>
      <p id="break-length">{breaking}</p>
      <button id="break-decrement" onClick={handleDecrement}>-</button>
    </>
  )
}



export default App;
