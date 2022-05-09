function hide(pkmn,hidee) {

idd = 'Pokemon' + pkmn + "stats";
    if (hidee == 'yes') {
        document.getElementById(idd).style.color = "#7fcdd6"
        document.getElementById(idd).style.fontSize = "0%";
    }
    else {
        document.getElementById(idd).style.color = "black";
        document.getElementById(idd).style.fontSize = '100%';
    }

}

var input = document.getElementById("chatinput");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      validate(e);
    }
});

function validate(e) {
    var text = e.target.value;
    chat()
    document.getElementById("chatinput").value = ""
}

function chat() {
    var txt = document.getElementById('chatinput').value;
    username = 'Godsen';
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    chatlog = chatlog + username + ' [' + time + ']' + ' : ' + txt + "<br>"
    document.getElementById('chatlog').innerHTML = chatlog;
}

function updatechat() {
    document.getElementById('chatlog').innerHTML = chatlog;
}