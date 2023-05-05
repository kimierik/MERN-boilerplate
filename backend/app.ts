import express from "express";
import bodyParser from "body-parser";

import formidable,{errors as formidableErrors} from 'formidable';

import {MongoClient,GridFSBucket, ObjectId } from 'mongodb';
import {createReadStream, readFileSync} from "fs";


const app=express();
const PORT=3000;

const dbname="files"
const mongodbUrl ='mongodb://db:27017'

//needed to not trigger corse
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding , multipart/formdata");
  res.header("Access-Control-Allow-Headers", ['*'] );
  next();
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



const client= new MongoClient(mongodbUrl);

async function main(){

	await client.connect();
	console.log('mongo db has connected');
	const db =client.db(dbname);
	//const collection=db.collection('documents');
	const bucket = new GridFSBucket(db,{bucketName:'FileBucket' });


    //this is where to put mongodb bucker.openuploadstream thing
    app.get('/api/download',function(req,res,_next){
        
        let fileId=req.query["id"]?.toString();

        let find =new ObjectId(fileId)

        let fname:string;
        const cursor = bucket.find({_id:find});
        cursor.forEach((doc) => {
            fname=doc.filename;//this should npt be in for loop

            setTimeout(()=>{
                res.header('Content-Disposition', 'attachment; filename='+fname);
                bucket.openDownloadStream(find).pipe(res).on("error",function(error){
                    console.log("error on downoadstrenm")
                    console.log(error);
                });
            },100);
        });

    });


    app.get('/api/delete', function(req,res,next){

        console.log("delete")
        let fileId=req.query["id"]?.toString();
        let find =new ObjectId(fileId)
        const cursor = bucket.find({_id:find});
            // @ts-ignore
        cursor.forEach(doc => bucket.delete(doc._id));
    })


    //send data to the database
    app.post('/api-p',function(req,res,next){
        //TODO 
        //currently cannot handle multiple files at a time

        const form=formidable({multiples:true});
        form.parse(req,(err,_fields,files)=>{
            if(err){
                next(err);
                return;
            }
            //console.log(files.file)

            // @ts-ignore
            createReadStream( files.file.filepath).
            // @ts-ignore
                pipe(bucket.openUploadStream(files.file.originalFilename, {

				chunkSizeBytes: 1048576,

				metadata: { Category: 'test',Extention : 'test'  }
			}))

            res.send("success");
        })


    });


    //returns promise with all data from db
	async function GetAllBDData(){
		const cursor = bucket.find({});
		return cursor.map(function(doc){return doc}).toArray();
	}


    //get all files in the database
    app.get('/',(_req,res)=>{
        GetAllBDData().then((db )=>{ res.send(db); });
    });


    app.listen(PORT,()=>{
        console.log('backend on port listening: ',PORT);
    });


}

main();
