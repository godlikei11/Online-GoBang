
let chessGame = (function(){

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let list = [];
    let chessWidth = 30;
    let size = 15;
    canvas.width = chessWidth * (size+1);
    canvas.height = canvas.width;
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
        checkWin : checkWin,
        withdraw: withdraw,
        clearCanvas : clearCanvas,
        drawChessboard : drawChessboard,
        drawChess : drawChess,
        setList : setList,
        getList : getList,   
    }
})()

