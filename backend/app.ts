
//const express=require('express');
import express from "express";
import bodyParser from "body-parser";

//const formidable=require('formidable');
import formidable,{errors as formidableErrors} from 'formidable';
import { Readable } from "stream";

import {MongoClient,GridFSBucket, ObjectId } from 'mongodb';
import {type} from "os";
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
	const collection=db.collection('documents');
	const bucket = new GridFSBucket(db,{bucketName:'FileBucket' });



    //this is where to put mongodb bucker.openuploadstream thing
    app.get('/api/download',function(req,res,_next){
        
        console.log("download");
        console.log(req.query);
        let fileId=req.query["id"]?.toString();
        console.log(fileId);
        

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


            // @ts-ignore
    function getsingle(inp:formidable.File|formidable.File[]):formidable.File{
        if (inp instanceof formidable.File){
            // @ts-ignore
            return inp;
        }
    }


    //send data to the database
    app.post('/api-p',function(req,res,next){

        const form=formidable({multiples:true});
        form.parse(req,(err,fields,files)=>{
            if(err){
                next(err);
                return;
            }

            // @ts-ignore
            createReadStream( files.file.filepath).
            // @ts-ignore
                pipe(bucket.openUploadStream(file.files.originalFilename, {

				chunkSizeBytes: 1048576,

				metadata: { Category: 'test',Extention : 'test'  }
			}))

/*
            // @ts-ignore
            const stream = Readable.from();O
            readFileSync(files.file.)
            
			stream.
            console.log("fomind ",fields) ;
            // @ts-ignore
            console.log("fil ",files.file.filepath) ;
                */
            res.send("success");
        })
        //console.log( req.body);


        //res.send("done");
    });

	async function GetAllBDData(){
		const cursor = bucket.find({});
		return cursor.map(function(doc){return doc}).toArray();
	}


    //get all files in the database
    app.get('/',(_req,res)=>{
        GetAllBDData().then((db )=>{ res.send(db); });

        /*
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
            * */
       // rhies.send(items);
    });






    app.listen(PORT,()=>{
        console.log('backend on port listening: ',PORT);
    });


}

main();
