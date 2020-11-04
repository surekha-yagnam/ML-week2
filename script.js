message = document.getElementById('message');
input = document.getElementById('input');
bot_block = document.getElementById('bot_block');
user_block = document.getElementById('user_block');
msg_no = 0;
var flag=false;
var loadFile = function(event) {
   var image = document.getElementById('pic');
   image.src = URL.createObjectURL(event.target.files[0]);
};
var healthIssues;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       health_issues = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", "data.json", true);
xhttp.send();

function taketheinput(event){
    //taking input
    if(event.key === "Enter"){
        //user message
        message.innerHTML += user_block.outerHTML;
        msg_no += 1;
        message.lastChild.id = msg_no;
        message.lastChild.childNodes[3].textContent = input.value;
        processinput(input.value.toLowerCase());
        input.value = "";
    }
}

function processinput(inputvalue){
    if(inputvalue!=""){
        message.innerHTML += bot_block.outerHTML;
        msg_no += 1;
        message.lastChild.id = msg_no ;
        message.lastChild.childNodes[3].textContent = botreply(inputvalue)
    }
}
function botreply(inputvalue){
    res = inputvalue.match(/(foods_to_eat)|(\w+)/g);
    var stmnt = "foods_to_eat foods_to_avoid diabetes thyroid obesity thankyou";
    if(stmnt.includes(inputvalue)==false && flag==false){
        flag = true;
        return "Hello! "+inputvalue.toUpperCase()+" Enter the health issue";
    }
    if(res.includes("foods_to_eat")){
        var img = document.createElement('img');
        img.src = recentproduct.foods_to_eat_img;
        document.getElementById(msg_no).appendChild(img);
        return recentproduct.foods_to_eat;
    }
    if(res.includes("foods_to_avoid")){
        var img = document.createElement('img');
        img.src = recentproduct.foods_to_avoid_img;
        document.getElementById(msg_no).appendChild(img);
        return recentproduct.foods_to_avoid;
    }
    if(res.includes("thankyou")){
        return "Hope I am helpful.."
    }
    inp = "";
    res.forEach(function(product){
       if(healthIssues.hasOwnProperty(product)){
       inp= "Enter the details you want to know like foods_to_eat, foods_to_avoid ";
       recentproduct = healthIssues[product];
       }
    })
    if(inp){
       return inp;
    }
    return "Sorry! I didn't get you" ;
    

}
