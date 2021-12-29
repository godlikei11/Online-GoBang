function Register(){
    let Nick = $("#rgNickname")[0].value;
    let Pass = $("#rgPassword")[0].value;
    let rePass = $("#rePassword")[0].value;
    let Email = $("#Email")[0].value;
    let Note = document.getElementById("Note");
    if(Nick.length>=8){
        Note.innerHTML="<font color='red'>Nickname length can not more than 8 digits</font>";
        return;
    }
    else if(Nick ===""){
        Note.innerHTML="<font color='red'>Nickname can not be empty</font>";
        return;
    }
    else if(Pass.length<8){
        Note.innerHTML="<font color='red'>Password need at least 8 digits</font>";
        return;
    }
    else if(Pass === ""){
        Note.innerHTML="<font color='red'>Password can not be empty</font>";
        return;
    }
    else if(Pass === ""){
        Note.innerHTML="<font color='red'>Password can not be empty</font>";
        return;
    }
    else if(Pass != rePass){
        Note.innerHTML="<font color='red'>Two passwords are not consistent</font>";
        return;
    }
    else if(Email === ""){
        Note.innerHTML="<font color='red'>Email can not be empty</font>";
        return;
    }
    $.ajax({
        url: "node.js",
        type: "get",
        data: {Nickname:Nick,Password:Pass,Email:Email},

        success: function (Data,Status){
            if(Data=="success"){
                window.location.href="main.html"
            }
            else if(Data=="exist"){
                Note.innerHTML="<font color='red'>Name has already been used</font>";
            }
        }
    });
}