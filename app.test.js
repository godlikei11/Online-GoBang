
suite("test",function(){
    setup(function() {
        this.list=[{x: 150, y: 180, color: 'black'},{x: 240, y: 180, color: 'white'}]
        this.listv = [{x: 240, y: 150, color: 'black'}
        ,{x: 270, y: 240, color: 'white'}
        ,{x: 240, y: 210, color: 'black'}
        ,{x: 330, y: 300, color: 'white'}
        ,{x: 240, y: 180, color: 'black'}
        ,{x: 390, y: 150, color: 'white'}
        ,{x: 240, y: 240, color: 'black'}
        ,{x: 360, y: 150, color: 'white'}
        ,{x: 240, y: 270, color: 'black'}]
        this.listh=[{x: 120, y: 180, color: 'black'}
        ,{x: 150, y: 210, color: 'white'}
        ,{x: 150, y: 180, color: 'black'}
        ,{x: 240, y: 240, color: 'white'}
        ,{x: 180, y: 180, color: 'black'}
        ,{x: 270, y: 240, color: 'white'}
        ,{x: 210, y: 180, color: 'black'}
        ,{x: 210, y: 300, color: 'white'}
        ,{x: 240, y: 180, color: 'black'}]
        this.listObliquelyAbove=[{x: 420, y: 90, color: 'black'}
        ,{x: 330, y: 150, color: 'white'}
        ,{x: 390, y: 120, color: 'black'}
        ,{x: 360, y: 60, color: 'white'}
        ,{x: 360, y: 150, color: 'black'}
        ,{x: 390, y: 90, color: 'white'}
        ,{x: 330, y: 180, color: 'black'}
        ,{x: 360, y: 90, color: 'white'}
        ,{x: 300, y: 210, color: 'black'}]
        this.listObliquelyDownward=[{x: 120, y: 120, color: 'black'}
        ,{x: 240, y: 90, color: 'white'}
        ,{x: 150, y: 150, color: 'black'}
        ,{x: 180, y: 120, color: 'white'}
        ,{x: 180, y: 180, color: 'black'}
        ,{x: 210, y: 150, color: 'white'}
        ,{x: 210, y: 210, color: 'black'}
        ,{x: 180, y: 150, color: 'white'}
        ,{x: 240, y: 240, color: 'black'}];
        for(let i = 0 ; i<this.list.length;i++){
            chessGame.list[i]=this.list[i];
        }   
    })
    test("drawchess",function(){
        chai.assert.equal(chessGame.drawChess(chessGame.list[0]),this.list[0],"error");
    });//Draw chess test
    test("isChessThere",function(){
        chai.assert.equal(chessGame.isChessThere(chessGame.list[0]),true,"error");
    });//Check chess test
    test("checkWin-vertical",function(){
        for(let i = 0 ; i<this.listv.length;i++){
            chessGame.checkWin(this.listv[i])
            if(chessGame.checkWin(this.listv[i])){
                chai.assert.equal(chessGame.checkWin(this.listv[i]),true,"error");
            }
        }
    });//Vertical victory test
    test("checkWin-horizontal",function(){
        for(let i = 0 ; i<this.listh.length;i++){
            chessGame.checkWin(this.listh[i])
            if(chessGame.checkWin(this.listh[i])){
                chai.assert.equal(chessGame.checkWin(this.listh[i]),true,"error");
            }
        }
    });//Horizontal victory test
    test("checkWin-obliquely-above",function(){
        for(let i = 0 ; i<this.listObliquelyAbove.length;i++){
            chessGame.checkWin(this.listObliquelyAbove[i])
            if(chessGame.checkWin(this.listObliquelyAbove[i])){
                chai.assert.equal(chessGame.checkWin(this.listObliquelyAbove[i]),true,"error");
            }
        }
    });//Obliquely-above victory test
    test("checkWin-obliquely-downward",function(){
        for(let i = 0 ; i<this.listObliquelyDownward.length;i++){
            chessGame.checkWin(this.listObliquelyDownward[i])
            if(chessGame.checkWin(this.listObliquelyDownward[i])){
                chai.assert.equal(chessGame.checkWin(this.listObliquelyDownward[i]),true,"error");
            }
        }
    });//Obliquely-downward victory test
    test("withdraw",function(){
        chessGame.withdraw();
        console.log(chessGame.list);
        chai.assert.equal(chessGame.list.length,this.list.length-1,"error");
    });//Drawback test
});
