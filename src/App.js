import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [session, setSession] = useState(25);
  const [breaking, setBreaking] = useState(5);

  let inter;
  let min = session;
  let s = 0;
  let sw = true;
  let sw2 = true;

  const titlee = document.getElementById('timer-label');

  const handleClock = () => {
    let a = document.getElementById('beep');
    if (sw2) {
      let clock = document.getElementById('time-left');
      inter = setInterval(() => {
        let m = min < 10 ? '0' + min : min;
        let ss = s < 10 ? '0' + s : s;
        clock.innerText = m + ':' + ss;
        s--;
        if (s < 0) {
          s = 59;
          min--;
          if (min < 0) {
            if (sw) {
              min = breaking;
              titlee.innerText = 'Break';
              a.play();
            } else {
              min = session;
              titlee.innerText = 'Session';
              a.play();
            }
            sw = !sw;
            s = 0;
          }
        }

      }, 1000);
    } else {
      clearInterval(inter);
    }
    sw2 = !sw2;
  }
  const Restart = () => {
    const titlee = document.getElementById('timer-label');
    const a = document.getElementById('beep');
    let clock = document.getElementById('time-left');
    titlee.innerText = 'Session';
    clearInterval(inter);
    min = session - 1;
    s = 59;
    sw = true;
    sw2 = true;
    setSession(25);
    setBreaking(5);
    clock.innerText = session + ':00';
    a.pause();
    a.currentTime = 0;
  }



  return (
    <div className='container'>
      <div id="timer-label" className='wrapper'>
        Session
      </div>
      <div id="time-left" className='wrapper'>
        {(sw) ? (session < 10) ? '0' + session + ':00' : session + ':00' : (breaking < 10) ? '0' + breaking + ':00' : breaking + ':00'}
      </div>
      <div className='wrapper'>
        <button id="start_stop" onClick={handleClock}><i class="fas fa-play"></i><i class="fas fa-pause"></i></button>
        <button id="reset" onClick={Restart}><i class="fas fa-power-off"></i></button>
      </div>
      <div className='controls'>
        <div className='control-btn'>
          <h2 id='session-label'>Session Length</h2>
          <Session session={session} setSession={setSession} />
        </div>
        <div className='control-btn'>
          <h2 id='break-label'>Break Length</h2>
          <Breaking breaking={breaking} setBreaking={setBreaking} />
        </div>
      </div>


      <audio
        id="beep"
        preload="auto"
        ref={React.createRef()}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
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
    <div>
      <button id="session-increment" onClick={handleIncrement}><i class="fas fa-arrow-up"></i></button>
      <span id="session-length">{session}</span>
      <button id="session-decrement" onClick={handleDecrement}><i class="fas fa-arrow-down"></i></button>
    </div>
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
    <div>
      <button id="break-increment" onClick={handleIncrement}><i class="fas fa-arrow-up"></i></button>
      <span id="break-length">{breaking}</span>
      <button id="break-decrement" onClick={handleDecrement}><i class="fas fa-arrow-down"></i></button>
    </div>
  )
}



export default App;
