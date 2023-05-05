import { objelem } from "../Types/objElem"
import "./itemEntry/Entry.css"




function Entry(props:{item:objelem, update:Function}){
  

  function Pressed(id:string){
    console.log(id);
    //this sends get rq?=?=)?
    downloadFile(id);
  }
    
	async function downloadFile(id:string){
        /*
		const res=await fetch("http://localhost:3000/api?id="+id);
		const data=await res.blob();
         * dd*/
        window.open("http://localhost:3000/api/download?id="+id) 
	}

    async function deleteitem(id:string){
        fetch("http://localhost:3000/api/delete?id="+id);
    }


  return (
    <li >
      <div className="background" >
        <p className="EntryText"> {props.item.filename}</p>
        <p className="EntryText" >Uploaded by: {props.item.metadata.SenderId}</p>
        <button onClick={()=>Pressed(props.item._id)} >Download File</button> 
        <button onClick={()=>deleteitem(props.item._id)} >delete File</button> 
      </div>
    </li>
  )



}

export default Entry
