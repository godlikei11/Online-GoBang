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
