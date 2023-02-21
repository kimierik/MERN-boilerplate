
//const express=require('express');
import express from "express";
const http=require('http');

const {MongoClient,GridFSBucket, ObjectId } = require('mongodb');

const app=express();
//const server= http.createServer(app);
const PORT=3000;

//needed to not trigger corse
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//example for api endpoint
app.get('/api',function(req,res,next){
    res.send("this is a responce from the api");
});

app.get('/',(req,res)=>{
    res.send("this is an api");
});




app.listen(PORT,()=>{
    console.log('backend on port listening: ',PORT);
});