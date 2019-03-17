const http = require("http");
const express = require('express');
const fs = require("fs");
const url = require('url');

const JMath = require('./functions');

 var server =  http.createServer(async(req,res)=>
{
    res.writeHead(200,{'Content-type': 'text/html'});

    //Call getResult in functions.js
    var queryString = url.parse(req.url, true).query;
    var option = queryString.option !=null?queryString.option:null ;
    var userid= queryString.userid !=null?queryString.userid:null ;
    var name=queryString.name !=null?queryString.name:null;
    var number =queryString.number !=null?queryString.number:null;
    //console.log(option+" "+userid+" "+name+" "+number);
    JMath.getResult(option,userid,name,number);

    fs.writeFile("index.html",JMath.getPage(),(err)=>{
        if(err)
        {
            return console.log(err);
        }
    });
    //ONly way to avoid the no page thing without changing code
    await makeCallWaitSoPageLoads(200); 
    var mrs=fs.createReadStream(__dirname+'/index.html','utf8');   
    mrs.pipe(res);

}).listen(2999);
//Output on start
console.log("Listening to port 2999. Ready to go!");

function makeCallWaitSoPageLoads(s)
{
    return new Promise((r)=>{
        setTimeout(r,s);
    });
}
