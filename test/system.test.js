
let Nick = document.cookie.split(";")[1].split("=")[1];
let chessGame = (function(){

    let canvas = document.getElementById("canvas");
    let button = document.getElementById("button");
    let user1 = document.getElementById("user1");
    let user2 = document.getElementById("user2");
    let user2Background = document.getElementById("user2Background");
    let user1Background = document.getElementById("user1Background");
    let ctx = canvas.getContext("2d");
    let list = [];
    let chessWidth = 30;
    let size = 15;
    canvas.width = chessWidth * (size+1);
    canvas.height = canvas.width;
    button.style.marginLeft = (chessWidth * (size-2))/2+"px";
    button.style.marginTop = chessWidth * (size+2)+"px";
    user1.style.marginLeft = chessWidth * (size+2)+"px";
    user2.style.marginLeft = chessWidth * (size+2)+"px";
    user2Background.style.height = (chessWidth * (size+1))/2+"px";
    user1Background.style.height = (chessWidth * (size+1))/2+"px";
    user1Background.style.marginTop = (chessWidth * (size+1))/2+"px";
    function drawChessboard(){
        for(let i=1;i<size+1;i++){
            ctx.beginPath();
            ctx.moveTo(chessWidth,i*chessWidth);
            ctx.lineTo(chessWidth*size,i*chessWidth);
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(i*chessWidth,chessWidth);
            ctx.lineTo(i*chessWidth,chessWidth*size);
            ctx.stroke();
    
        }
    }
    
    function drawChess(item){
        ctx.beginPath();
        ctx.arc(item.x,item.y,chessWidth/2,0,2*Math.PI,false);
        ctx.fillStyle = item.color;
        ctx.fill();
        return true;
    }
    
    function clearCanvas(){
        ctx.clearRect(chessWidth/2,chessWidth/2,size*chessWidth,size*chessWidth);
    }
    
    function setList(data){
        list = data;
    }
    
    function getList() {
        return list;
    }

    function isChessThere(chessInfo) {
        return list.filter(function(item) {
            return item.x === chessInfo.x && item.y === chessInfo.y;
        }).length > 0;
    }
    
    function checkWin(chessInfo) {
        let winCase = [];
        console.log(chessInfo)
        for(let k=0;k<4;k++){
            winCase[k] = winCase[k]||[];
            for(let j=0;j<5;j++){
                winCase[k][j] = winCase[k][j]||[];
                for(let i=-j;i<5-j;i++){
                    if(k === 0){
                        winCase[k][j].push({
                            x:chessInfo.x - i*chessWidth,
                            y:chessInfo.y,
                            color:chessInfo.color
                        })
                    }
                    if(k === 1){
                        winCase[k][j].push({
                            x:chessInfo.x,
                            y:chessInfo.y - i*chessWidth,
                            color:chessInfo.color
                        })
                    }
                    if(k === 2){
                        winCase[k][j].push({
                            x:chessInfo.x - i*chessWidth,
                            y:chessInfo.y - i*chessWidth,
                            color:chessInfo.color
                        })
                    }
                    if(k === 3){
                        winCase[k][j].push({
                            x:chessInfo.x + i*chessWidth,
                            y:chessInfo.y - i*chessWidth,
                            color:chessInfo.color
                        })
                    }
                }
            }
        }
        return winCase.some(function(winPosition){
            return winPosition.some(function(winList){
                return winList.every(function(item){
                    return list.filter(function(chess){
                        return item.x === chess.x && item.y === chess.y && item.color === chess.color
                    }).length>0
                })
            })
        })

    }

    function play(e){
        console.log(e)
        if(e.clientY<=chessWidth/2||
            e.clientY>=chessWidth*size + chessWidth / 2||
            e.clientX>=chessWidth*size + chessWidth / 2||
            e.clientX<=chessWidth/2){
            return
        }
        let chessInfo = {
            x:Math.round(e.clientX/chessWidth)*chessWidth,
            y:Math.round(e.clientY/chessWidth)*chessWidth,
            color:list.length % 2 === 0 ? 'black' : "white"
        }
        if(isChessThere(chessInfo)){
            return
        }
        list.push(chessInfo)
        console.log(list);
        window.dispatchEvent(new CustomEvent("updateChess",{detail:list}));
        drawChess(list[list.length-1]);
        checkWin(chessInfo);
    }

    function withdraw(){
        list.pop();
        window.dispatchEvent(new CustomEvent("updateChess",{detail:list}));
        clearCanvas();
        drawChessboard();
        list.forEach(drawChess);
    }

    
    function bindEvent() {
        canvas.addEventListener("click",play)
        button.addEventListener("click",withdraw)
    }

    drawChessboard();
    bindEvent();

    return{
        play:play,
        checkWin : checkWin,
        withdraw: withdraw,
        clearCanvas : clearCanvas,
        drawChessboard : drawChessboard,
        drawChess : drawChess,
        setList : setList,
        getList : getList,   
    }
})()

function Reg(){
    window.location.href="reg.html"
}
function Log(){
    let Name = document.getElementById("Name").value;
    let Pass = document.getElementById("Password").value;
    let Note = document.getElementById("Note");
    $.ajax({
        url: "node.js",
        type: "get",
        data: {Nickname:Name,Password:Pass},
        success: function (Data,Status){
            if(Data=="not exist"){
                Note.innerHTML="<font color='red'>This name is not exist</font>";
            }
            else if(Data=="success"){
                window.location.href="room.html";
            }
            else if(Data=="fail"){
                Note.innerHTML="<font color='red'>The password is not right</font>";
            }
            console.log(Data);
            console.log(Status);
    }
    }); 


}
let user1 = document.getElementById("user1");
let user2 = document.getElementById("user2");
let user2Background = document.getElementById("user2Background");
let user1Background = document.getElementById("user1Background");
let gameSit = document.getElementById("gameSituation");
let room = document.cookie.split(";")[0].split("=")[1];
let user = document.cookie.split(";")[1].split("=")[1];
let canvas = document.getElementById("canvas");
let roomInfo = [
    roomClient = room,
    userClient = user
];
let roomMate = false;
let roomDict = false;
let sameRoom = false;
let blackColor = true;
let round = true;
function clearCookie(){
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}

let webSocket = new WebSocket("ws://"+document.domain+":8081")
webSocket.onmessage = function(message){
    let Mge = JSON.parse(message.data);
    if(Mge.length===undefined){
        if(Mge.room!==undefined){
            if(Mge.room===room){
                if(roomMate===false){
                    console.log(Mge)
                    canvas.setAttribute("class","click");
                    sameRoom = true;
                    roomMate = true;
                    gameSit.innerText = "Game start"
                    gameSit.style.color = "red"
                }
            }
            else{
                sameRoom = false;
            }
        }
    }
    if(Mge[0]!==undefined){
        if(Mge[0].x === undefined){
            if(Mge[0]===room){
                canvas.setAttribute("class","click");
                gameSit.innerText = "Game start"
                gameSit.style.color = "red"

                sameRoom = true;
            }
            else{
                sameRoom = false;
            }
        }
    }
    if(sameRoom === true){
        if(Mge.length===undefined){
            if(Mge.room===undefined){
                if(Mge[room][0]==user){
                    blackColor = true;
                    user1Background.style.backgroundColor = "#4F4F4F";
                    user1.innerText = Mge[room][0];
                    user2.style.color = "white";
                    user2Background.style.backgroundColor = "#CFCFCF";
                    user2.innerText = Mge[room][1];
                    user1.style.color = "black";

                }
                else if(Mge[room][1]==user){
                    user1Background.style.backgroundColor = "#CFCFCF";
                    user1.innerText = Mge[room][1];
                    user2.style.color = "black";
                    user2Background.style.backgroundColor = "#4F4F4F";
                    user2.innerText = Mge[room][0];
                    user1.style.color = "white";
                    blackColor = false
                    round = false
                }
                else if (Mge[room][0]!==user||Mge[room][1]!==user){
                    sameRoom = false; 
                }
            }  
        }
        if(Mge.length!==undefined&&Mge.length!==0){
            if(Mge[0].x!==undefined){
                if(blackColor ===true){
                    if(Mge[Mge.length-1].color==="black"){
                        canvas.setAttribute("class","notclick");
                        round = false;
                    }
                    else if(Mge[Mge.length-1].color==="white"){
                        canvas.setAttribute("class","click");
                        round = true;
                    }
                }
                if(blackColor ===false){
                    if(Mge[Mge.length-1].color==="black"){
                        canvas.setAttribute("class","click");
                        round = true;
                    }
                    else if(Mge[Mge.length-1].color==="white"){
                        canvas.setAttribute("class","notclick");
                        round = false;
                    }
                }
            }
        }

        if(Mge.length!==undefined){
            if(Mge[0]!==undefined){
                if(Mge[0].x!==undefined){
                    chessGame.clearCanvas();
                    chessGame.drawChessboard();
                    chessGame.setList(Mge);
                    chessGame.getList().forEach(chessGame.drawChess);
                    if(chessGame.checkWin(Mge[Mge.length-1])){
                        if(Mge[Mge.length-1].color=="black"){
                            if(blackColor==true){
                                setTimeout("alert ('"+user1.innerText+" win')",100) 
                            }
                            else if(blackColor==false){
                                setTimeout("alert ('"+user2.innerText+" win')",100) 
                            }
                        }
                        if(Mge[Mge.length-1].color=="white"){
                            if(blackColor==true){
                                    setTimeout("alert ('"+user2.innerText+" win')",100) 
                                }
                                else if(blackColor==false){
                                    setTimeout("alert ('"+user1.innerText+" win')",100) 
                                }
                        }
                        webSocket.send(JSON.stringify(["gameover",room]));
                        clearCookie();
                        setTimeout("window.location.href='room.html'",2000)
                    }
                }
            }
        }
    }
}
webSocket.onopen = function() {
    window.addEventListener("updateChess",function (evt) {
        webSocket.send(JSON.stringify(roomInfo));
        webSocket.send(JSON.stringify(evt.detail));
    },false);
}

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
         if(request.url=="/login.html"){
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
function Register(){
    let Name = $("#rgName")[0].value;
    let Pass = $("#rgPassword")[0].value;
    let rePass = $("#rePassword")[0].value;
    let Email = $("#Email")[0].value;
    let Note = document.getElementById("Note");
    if(Name ===""){
        Note.innerHTML="<font color='red'>Name can not be empty</font>";
        return;
    }
    if(Name.length>=8){
        Note.innerHTML="<font color='red'>Name length can not more than 8 digits</font>";
        return;
    }
    if(Pass.length<8){
        Note.innerHTML="<font color='red'>Password need at least 8 digits</font>";
        return;
    }
    if(Pass != rePass){
        Note.innerHTML="<font color='red'>Two passwords are not same</font>";
        return;
    }
    if(Email === ""){
        Note.innerHTML="<font color='red'>Email can not be empty</font>";
        return;
    }
    $.ajax({
        url: "node.js",
        type: "get",
        data: {Nickname:Name,Password:Pass,Email:Email},

        success: function (Data,Status){
            if(Data=="success"){
                window.location.href="login.html"
            }
            else if(Data=="exist"){
                Note.innerHTML="<font color='red'>Name has already been used</font>";
            }
        }
    });
}
function Back(){
    window.location.href="login.html"
}
console.log("success")