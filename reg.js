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