
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const router=express.Router();
const authentication = require('./routes/authentication')(router);
const config=require('./config/database');
const bodyParser = require('body-parser');

mongoose.Promise=global.Promise;
mongoose.connect(config.uri,(err)=>{
    if(err){
        console.log('Could not connect to  Database ',err);
    }else{
        console.log('connected successfully to '+config.db);
    }
});

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/client/dist/'));
app.use('/authentication',authentication);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'client/dist/index.html'));
});

app.listen(8080,()=>{
    console.log('Listening on port 8080');
});