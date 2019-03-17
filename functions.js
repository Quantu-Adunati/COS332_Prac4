const fs = require("fs");
var customString ="";
var option,id,name,number,baseUserArray,users  //Used globally thoughout the file

function logError(serverError,clientError){ //Function that simplifies the logging of errors
    console.log("==========================\n"+serverError);
    customString = clientError;
}

function createUserArray(){ //Nice way to get users, we demarkate them using ';'
    var contents = fs.readFileSync('user.txt', 'utf8');
    users = [];

    baseUserArray = contents.split(";");    //Id-Name: number
    //load object
    baseUserArray.forEach(el => {

        var user = {
            id : el.substring(0, el.lastIndexOf("-")),
            name : el.substring(el.lastIndexOf("-") + 1, el.lastIndexOf(":")),
            number : el.substring(el.lastIndexOf(":") + 1, el.length)
        };
        users.push(user);
    });

    //Why pop ? because a blank is always inserted at the end for some reason
    users.pop();

}

exports.setParams = function setParams(...args){    //called by server to set params used in the file

    option = args[0];
    id = args[1];
    name = args[2];
    number = args[3];

}
function insertUser(){
    if(name == null || number == null || name == "" || number == ""){
        logError("Params not supplied","Please input a name and a number for the user!");
        return;
    }

    createUserArray();
    console.log("USERS:");
    console.log(users);

    console.log("Last:");
    console.log(users[users.length - 1]);

    var lastId = parseInt(users[users.length - 1].id) + 1;
    console.log("Last ID:"+lastId);
    fs.appendFile("user.txt",lastId + "-"+name+":"+number+";" , function(err) {
        if(err) {
            return console.log(err);
        }                       
    }); 

    logError("The file was saved!","The user "+name+" has been inserted");
}

function display(){
 
    createUserArray();

    var list = "";

    users.forEach(e => {
        list += e.name + " " + e.number + "<br/>";
    });

    logError("File read",list);
}


function getUser(){
    if(name == null || name == ""){
        logError("Params not supplied","Please input a username to search");
        return;
    }
    
    createUserArray();
    var found = false;
    var targetUser;

    users.forEach(el => {
        if(el.name == name){
        targetUser = el;
        found = true;
        }
        
    });
    logError("User found",targetUser.id + "- "+targetUser.name+ " "+targetUser.number+ "<br/>");

    if(found != true)
    logError("User not found","That user was not found");
}

function deleteUser(){
    logError("deleteUser called","");
}

function update(){
    logError("update called","");
}

exports.getResult = function getResult(...args)//args is an array with all our arguments
{
    if(args[0] == null){
        logError("","Please select an option");
        return;
    }
    
    if(args[0] == 1)
    insertUser();
    else if(args[0] == 2)
    display();
    else if(args[0] == 3)
    getUser();
    else if(args[0] == 4)
    deleteUser();
    else if(args[0] == 5)
    update();

}

var pagePart1 = `<!DOCTYPE html>
<html>
<head>
    <title>Phone Book-Practical 4</title>
    <meta charset="UTF-8">
    <meta name="description" content="Practical 4 COS 332">
    <meta name="author" content="Richard McFadden Jarrod Goschen">
</head> 
    <body>
        <h1>Welcome to COS 332 Practical 4</h1>
            <h2>Menu</h2>
            <ol>
                <li>Insert: "1 name number"</li>
                <li>Display all: "2"</li>
                <li>Get user: "3 name"</li>
                <li>Delete: "4 userid"</li>
                <li>Update: "5 userid name number"</li>
            </ol>
            <p><b>Leave input boxes empty if not applicable</b></p>
            <form action="/" method="get">
                Option:
                <input type="number" name='option'/> <br/> <br/>
                ID:
                <input type="text" name='userid'/> <br/> <br/>
                Name:
                <input type="text" name='name'/> <br/> <br/>
                Number:
                <input type="text" name='number'/> <br/> 
                <input type="submit" name="Sumbit"/>
            </form><p>`;
var pagePart2 = `        
        </p>
    </body>
</html>`;

exports.getPage = function getPage(){
    return pagePart1 +customString+ pagePart2;
}
