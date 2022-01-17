var reg = require("../reg.js");
var login = require("../login.js")
var app = require("../app.js")
var network = require("../network.js")
var Node = require("../Node.js")

describe("#Reg",function(){
    describe("#register",function(){
        reg.Register();
    })
    describe("#back",function(){
        reg.Back();
    })
})
//app.chessGame.drawChess();
