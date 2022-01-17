    let http = require('http');
let fs = require('fs');
let url = require('url');
let MongoClient = require('mongodb').MongoClient;
let WebSocket = require("ws")
try{
    MongoClient.connect("mongodb://localhost:27017/");
     console.log("MongoClient connect success")
}catch{
    console.log("Mongodb connect fail")
}
try{
    new WebSocket.Server({ port: 8081, clientTracking: true });
    console.log("WebSocket connect success")
}catch{
    console.log("WebSocket connect fail")
}
try{
    http.createServer().listen(8080); 
    console.log("Http connect success")
}catch{
    console.log("Http connect fail")
}
console.log("pass");
process.exit(port:8080)
