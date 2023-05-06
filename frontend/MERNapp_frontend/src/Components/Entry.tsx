import { objelem } from "../Types/objElem"
import "./itemEntry/Entry.css"




function Entry(props:{item:objelem, update:Function}){
  

    async function downloadFile(id:string){
        window.open("http://localhost:3000/api/download?id="+id) 
	}

    async function deleteitem(id:string){
        fetch("http://localhost:3000/api/delete?id="+id);
        props.update()
    }

  return (
    <li >
      <div className="background" >
        <p className="EntryText"> {props.item.filename}</p>
        <p className="EntryText" >Uploaded by: {props.item.metadata.SenderId}</p>
        <button onClick={()=>downloadFile(props.item._id)} >Download File</button> 
        <button onClick={()=>deleteitem(props.item._id)} >delete File</button> 
      </div>
    </li>
  )



}

export default Entry
