const fs = require("fs");
var customString ="";
exports.getResult = function getResult(...args)//args is an array with all our arguments
{
    if(args[0] != null)
    {
        if(args[1] !=null && args[0]!= 2)
        {
            if(args[0]== 1)
            {   
                //Insert the user
                if(args[2] != null)
                {
                    //Insert the user to file
                    fs.appendFile("user.txt", "\n"+args[1]+" "+args[2] , function(err) {
                        if(err) {
                            return console.log(err);
                        }                       
                    }); 
                    customString = "The user "+args[1]+" has been inserted";
                    console.log("The file was saved!");
                }
                else{
                    //add error message to the page saying parameters was not specify
                }

            }
            else  if(args[0] == 3)
            {
                //we get user...
                if(args[2] != null)
                {
                    //Get the user from file
                }
                else{
                    //add error message to the page saying parameters was not specify
                }

            }else if(args[0] == 4)
            {
                //we delete a user
                if(args[2] != null)
                {
                    //delete the user from file
                }
                else{
                    //add error message to the page saying parameters was not specify
                }
            }else if(args[0] == 5)
            {
                //Update the user
                if(args[2] != null)
                {
                    if(args[3] != null)
                    {
                        //Update the user
                    }
                }
                else{
                    //add error message to the page saying parameters was not specify
                }
            }
        }
        else if(args[0]==2){
            //Option 2 was selected thus we just display all users
            console.log("here");
            var contents = fs.readFileSync('user.txt', 'utf8');
            console.log(contents);
            customString = contents;
        }
    }
}
// exports.getResult = function getResult()
// {
//     if(arguments.length == 3)
//     {
//         //Option one was selected
//         //Thus insert into file
//     }
//     else if(arguments.length == 1)
//     {
//         //Option 2 was chosen
//         //Display all users and numbers
//     }
// }
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
                <input type="number" name='option'/>
                Name/ID:
                <input type="text" name='userid'/>
                Name/Number:
                <input type="text" name='name'/>
                Number:
                <input type="text" name='number'/>
                <input type="submit" name="Sumbit"/>
            </form><p>`;
var pagePart2 = `        
        </p>
    </body>
</html>`;

exports.getPage = function getPage(){
    return pagePart1 +customString+ pagePart2;
}
