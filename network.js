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

