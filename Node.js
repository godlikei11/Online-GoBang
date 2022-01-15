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
         if(roomDict[Message.room] === undefined){
            roomDict[Message.room] = ["ClientA","ClientB"]
            roomDict[Message.room][0]=Message.user;
         }
         else if(roomDict[Message.room][1]==="ClientB"){
            roomDict[Message.room][1]=Message.user;
         }
      }
      if(Message[0]=="gameover"){
         console.log(Message[1])
         delete roomDict[Message[1]]
      }
      wss.clients.forEach(function(client){
         client.send(JSON.stringify(roomDict))
         client.send(message);
      })
   });
});

// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   let pathname = url.parse(request.url).pathname;
   // 输出请求的文件名
   if(request.url.indexOf("?")!=-1){
      let data1 = request.url.split("?");
      let data2 = data1[1].split("&");
      let NameData = data2[0].split("=");
      let PassData = data2[1].split("=");
      let urll = "mongodb://localhost:27017/";
      MongoClient.connect(urll, function(err, db) {
         function sendMessage(message){
            response.writeHead(200, {'Content-type' : 'text/html'});
            response.write(message)
            response.end();
         }
         if (err) throw err;
         let dbo = db.db("Database3");
         if(data2.length==3){
            let Edata = data2[2].split("=");
            let myobj = { Nickname: NameData[1], Password: PassData[1],Email : Edata[1] };
            let Name = {"Nickname":NameData[1]}
            dbo.collection("site").find(Name).toArray(function(err, result) {
               if (err) throw err;
               else if(result==""){
                  dbo.collection("site").insertOne(myobj, function(err, res) {
                     if (err) throw err;
                     console.log("文档插入成功");
                     sendMessage("success");
                  });
               }
               else{
                  sendMessage("exist");
               }
               //console.log(result);
            });
         }
         else if(data2.length==2){
            let myobj = { Nickname: NameData[1], Password: PassData[1]};
            let Name = {"Nickname":NameData[1]}
            dbo.collection("site").find(Name).toArray(function(err, result) {
               //console.log(result[0].Nickname);
               if (err) throw err;
               else if(result==""){
                  sendMessage("not exist");
               }
               else{
                  if(PassData[1]==result[0].Password){
                     sendMessage("success");
                    }
                  else{
                     sendMessage("fail");
                  }
               }
            });
         }
  
         
     });
     
     return

   }
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/html
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         // HTTP 状态码: 200 : OK
         // Content Type: text/html
         response.writeHead(200, {'Content-Type': 'text/html'});
         if(request.url=="/main.html"){
            response.write("<h1>Login </h1>");
         }
         else if(request.url=="/reg.html"){
            response.write("<h1>Register</h1>");
            }
         // 响应文件内容
         response.write(data);          
      }
      //  发送响应数据
      response.end();
   });
}).listen(8080);

/*let ws = require('nodejs-websocket');
let server = ws.createServer(function(conn){
   
   conn.on("text",function(str){
       //服务端打印接收到的数据
       let x=document.cookie;
       console.log(x);
       //接收到的数据打上标记“Server-”，再发送回客户端
       conn.sendText("Server-"+str);
   });
}).listen(3000);*/
   /*conn.on("close",function(code,reason) {
       console.log("Disconnected.");
   });

   conn.on("error",function(code,reason) {
       console.log("Error.")
   });*/


/*let server = ws.createServer(function(socket){
// 事件名称为text(读取字符串时，就叫做text)，读取客户端传来的字符串
    socket.on('text', function(str) {  
      let cookie =getCoo;
     // 在控制台输出前端传来的消息　　
        console.log(cookie);
        //向前端回复消息
         socket.sendText(cookie);

    });
}).listen(3000);   
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');

/*



   let url = location.search;
   let theRequest = new Object();
   if(url.indexOf("?")!=-1){
      let str = url.substring(1);
      let strs = str.split("&");
      for(let i = 0;i<strs.length;i++){
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1])
      }
      console.log(theRequest);
      return theRequest;
   }
*/
      /*MongoClient.connect(urll, function(err, db) {
         if (err) throw err;
         let dbo = db.db("");
         let myobj = { Nickname: tdata[0], Password: tdata[1],Email : tdata[2] };
         console.log(myobj);
      dbo.collection("site").insertOne(myobj, function(err, res) {
         if (err) throw err;
         console.log("文档插入成功");
         db.close();
      });
      dbo.collection("site").find(whereStr).toArray(function(err, result) {
         if (err) throw err;
         console.log(result);
         db.close();
      });
});*/