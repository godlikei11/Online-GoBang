let http = require('http');
let fs = require('fs');
let url = require('url');
let MongoClient = require('mongodb').MongoClient;
let WebSocket = require("ws")
let wss = new WebSocket.Server({ port: 8081, clientTracking: true });
let roomDict = {};
wss.on('connection', function connection(ws) {
   ws.on('message', function incoming(message) {
      let Message = JSON.parse(message);
      if(Message.room!==undefined){
         //Record room information
         if(roomDict[Message.room] === undefined){
            //First person
            roomDict[Message.room] = ["ClientA","ClientB"]
            roomDict[Message.room][0]=Message.user;
         }
         else if(roomDict[Message.room][1]==="ClientB"){
            //Second person
            roomDict[Message.room][1]=Message.user;
         }
      }
      if(Message[0]=="gameover"){
         //Gameovr quit the room
         console.log(Message[1])
         delete roomDict[Message[1]]
      }
      wss.clients.forEach(function(client){
         //Sendback the data
         client.send(JSON.stringify(roomDict))
         client.send(message);
      })
   });
});

http.createServer( function (request, response) {  
   //Create server
   let pathname = url.parse(request.url).pathname;
   //Parse the request, including the filename
   if(request.url.indexOf("?")!=-1){
      let data1 = request.url.split("?");
      let data2 = data1[1].split("&");
      let Ndata = data2[0].split("=");
      let Pdata = data2[1].split("=");
      //Parse the obtained data
      let urll = "mongodb://localhost:27017/";
      MongoClient.connect(urll, function(err, db) {
         function sendMessage(message){
            response.writeHead(200, {'Content-type' : 'text/html'});
            response.write(message)
            response.end();
         }
         if (err) throw err;
         let dbo = db.db("Database3");
         //Build database
         if(data2.length==3){
            //Reg interface
            let Edata = data2[2].split("=");
            let myobj = { Nickname: Ndata[1], Password: Pdata[1],Email : Edata[1] };
            let Name = {"Nickname":Ndata[1]}
            dbo.collection("site").find(Name).toArray(function(err, result) {
               //Find out if the name exists
               if (err) throw err;
               else if(result==""){
                  dbo.collection("site").insertOne(myobj, function(err, res) {
                     //Insert information into database
                     if (err) throw err;
                     sendMessage("success");
                  });
               }
               else{
                  //Name exists, error
                  sendMessage("exist");
               }
            });
         }
         else if(data2.length==2){
            //Login interface
            let Name = {"Nickname":Ndata[1]}
            dbo.collection("site").find(Name).toArray(function(err, result) {
               //Query name
               if (err) throw err;
               else if(result==""){
                  //Name not exist
                  sendMessage("not exist");
               }
               else{
                  if(Pdata[1]==result[0].Password){
                     //Login success
                     sendMessage("success");
                    }
                  else{
                     //Wrong password
                     sendMessage("fail");
                  }
               }
            });
         }
     });
     
     return

   }
   
   fs.readFile(pathname.substr(1), function (err, data) {
      //Read the requested file contents from the file system
      if (err) {
         console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         response.writeHead(200, {'Content-Type': 'text/html'});
         if(request.url=="/login.html"){
            response.write("<h1>Login </h1>");
            //Login title
         }
         else if(request.url=="/reg.html"){
            response.write("<h1>Register</h1>");
            //Reg title
            }
         response.write(data);          
      }
      response.end();
      //Send response data
   });
}).listen(8080);

