import { useState } from 'react'
import './App.css'

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
      <div className="card">

        <button onClick={() =>{ get()} }>
        </button>
		<p>
			{msg}
		</p>


      </div>
    </div>
  )
}

export default App
