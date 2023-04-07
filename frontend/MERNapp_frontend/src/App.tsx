import { useState } from 'react'
import './App.css'
import EntryContainer from './Components/EntryContainer';
import EntryForm from './Components/EntryForm';

function App() {
	
	const [msg,setmsg]=useState("press the button");

  
	//example on how to send getrqs to backend. this should be some variable tbh


  return (
    <div className="App">
        <EntryForm/>

      <div className="card">

        <button onClick={() =>{  }}>
        </button>
		<p>
			{msg}
		</p>
		<EntryContainer/>


      </div>
    </div>
  )
}

export default App
