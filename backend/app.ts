
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
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding , multipart/formdata");
  res.header("Access-Control-Allow-Headers", ['*'] );
  next();
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))






//example for api endpoint
app.get('/api',function(_req,res,_next){
    res.send("this is a responce from the api");
});



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
    console.log( req.body);


    //res.send("done");
});



app.get('/',(_req,res)=>{
    res.send("this is an api");
});




app.listen(PORT,()=>{
    console.log('backend on port listening: ',PORT);
});
