    let http = require('http');
let fs = require('fs');
let url = require('url');
let MongoClient = require('mongodb').MongoClient;
let WebSocket = require("ws")
try{
    MongoClient.connect("mongodb://localhost:27017/");
}catch{
    console.log("Mongodb connect fail")
}
try{
    new WebSocket.Server({ port: 8081, clientTracking: true });
}catch{
    console.log("WebSocket connect fail")
}
try{
    http.createServer().listen(8080); 

}catch{
    console.log("Http connect fail")
}
