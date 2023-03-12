import { useState } from 'react'
import './App.css'
import EntryContainer from './Components/EntryContainer';
import EntryForm from './Components/EntryForm';

function App() {
	
	const [msg,setmsg]=useState("press the button");

  
	//example on how to send getrqs to backend. this should be some variable tbh
	async function get(){
		const res=await fetch("http://localhost:3000/api");
		const data=await res.text();
		setmsg(data);
	}


  return (
    <div className="App">
        <EntryForm/>

      <div className="card">

        <button onClick={() =>{ get()} }>
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
