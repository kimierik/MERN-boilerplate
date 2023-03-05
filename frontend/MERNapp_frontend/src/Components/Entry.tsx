import { objelem } from "../Types/objElem"
import "./itemEntry/Entry.css"




function Entry(props:{item:objelem}){
  

  function Pressed(id:string){
    console.log(id);
    //this sends get rq?=?=)?
  }
    
  return (
    <li >
      <div className="background" >
        <p className="EntryText"> {props.item.filename}</p>
        <p className="EntryText" >Uploaded by: {props.item.metadata.SenderId}</p>
        <button onClick={()=>Pressed(props.item._id)} >Download File</button> 
      </div>
    </li>
  )



}

export default Entry