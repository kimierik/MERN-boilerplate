import { objelem } from "../Types/objElem"
import { ObjectId } from "mongodb"
import Entry from "./Entry";
import "./entryContainer/EntryContainer.css";
import {useEffect, useState} from "react";



//where all entries are

function EntryContainer(){
//get data from server // debug for now

    const [items,setItems]= useState<objelem[]>();
    
	async function get(){
		const res=await fetch("http://localhost:3000/");
		const data=await res.json();
        setItems(data as unknown as objelem[]);
	}

    useEffect(()=>{
        get();
    },[])


    const getitems=()=>{
        if (items!=undefined){
            console.log(typeof(items))
            const things= items.map((i)=>
                <Entry item={i} key={i._id} update={get} ></Entry>// since this will be a list element we need to give it a key
            )

            return things;

        }else{
            return <p>loading</p>  ;
        }
    
    }
    


   //this has some borders and something that you can scroll up and down 
   //
  return (
    <div >
        <ul className="list">
            {getitems()}
        </ul>
    </div>
  )
}

export default EntryContainer
