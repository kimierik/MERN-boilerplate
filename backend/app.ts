
//const express=require('express');
import express from "express";
import bodyParser from "body-parser";

//const formidable=require('formidable');
import formidable,{errors as formidableErrors} from 'formidable';

//const {MongoClient,GridFSBucket, ObjectId } = require('mongodb');

const app=express();
const PORT=3000;

//needed to not trigger corse
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding , multipart/formdata");
  res.header("Access-Control-Allow-Headers", ['*'] );
  next();
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))







//this is where to put mongodb bucker.openuploadstream thing
app.get('/api/download',function(_req,res,_next){


    res.send("download window");
});



//send data to the database
app.post('/api-p',function(req,res,next){

    const form=formidable({multiples:true});
    form.parse(req,(err,fields,files)=>{
        if(err){
            next(err);
            return;
        }
        console.log("fomind ",fields) ;
        console.log("fil ",files) ;
        res.send("success");
    })
    //console.log( req.body);


    //res.send("done");
});



//get all files in the database
app.get('/',(_req,res)=>{
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
    res.send(items);
});




app.listen(PORT,()=>{
    console.log('backend on port listening: ',PORT);
});
