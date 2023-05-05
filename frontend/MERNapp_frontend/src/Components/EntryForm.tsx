import {useState} from "react";
import axios from 'axios';



export default function EntryForm(props:any){

    const [file,setfile]=useState<File>();




    //subs file to backend maby
    async function filesubmit(){
        if(file!=undefined){

            const fd=new FormData();
            fd.append("file", file);

            const full_config={ 
                method:"post",
                url:"http://localhost:3000/api-p",
                data:fd,
                headers:{ "Content-Type":"multipart/form-data"}

            }

            axios(full_config)
                .then( (res)=>{console.log("success", res)})
                .catch((err)=>{console.log("post error " ,err)})
                .finally(()=>{console.log("axios post ended")});
        }
    }


    function onfilechange(e:any){
        if (e.target.files[0]!=null){
            setfile(e.target.files[0])
        }
    }


    return(
        <div>

        <p>entryform</p>
            <form action="http://localhost:3000/api" method="POST"  >
                <input type="file" onChange={(e)=>{onfilechange(e)}}/>
            <input type="button" value="thing" onClick={filesubmit}/>
        </form>

        </div>
    );
}




