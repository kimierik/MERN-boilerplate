import { objelem } from "../Types/objElem"
import { ObjectId } from "mongodb"
import Entry from "./Entry";
import "./entryContainer/EntryContainer.css";



//where all entries are

function EntryContainer(){
//get data from server // debug for now

    const items=[
        {
        _id:  "63eb6bc9079bc00e5e5c1b5d",
        length: 1545347,
        chunkSize: 1048576,
        uploadDate: '2023-02-14T11:08:57.382Z',
        filename: 'hot pic.jpg',
        metadata: { SenderId: 'asdf1234adfg', Extention: 'jpg',Permission:1 }
        },
        {
        _id: "6fasddfg3easdf12245ac1b5d",
        length: 1545347,
        chunkSize: 1048576,
        uploadDate: '2023-02-14T11:08:57.382Z',
        filename: 'crazy image.jpg',
        metadata: { SenderId: 'asdf12lköudfg', Extention: 'jpg',Permission:2 }
        }
    ]

    const things=items.map((i)=>
        <Entry item={i} key={i._id} ></Entry>// since this will be a list element we need to give it a key
    )

   //this has some borders and something that you can scroll up and down 
   //
  return (
    <div >
        <ul className="list">
            {things}
        </ul>
    </div>
  )
}

export default EntryContainer
