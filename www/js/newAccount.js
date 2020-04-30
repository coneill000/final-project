let dispNewAccount = function(){
    console.log("entering display new account");
    //sets up workspace
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    
    //username input
    let user = document.createElement("input");
    user.setAttribute("type", "text");
    user.setAttribute("placeholder", "username");
    user.setAttribute("id", "username");
    workspace.append(user);
    //password input
    let pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "password");
    pass.setAttribute("id", "password");
    workspace.append(pass);
    //button
    let button = document.createElement("button");
    let text = document.createTextNode("Create New Account");
    button.appendChild(text);
    button.addEventListener("click", createNewAccount);
    workspace.append(button);
}

function createNewAccount(){
    console.log("entering createNewAccount");
    let newUser = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };
    console.log(newUser);
    
    let users = [];
    if(localStorage.getItem("users")){
        console.log("There were previously registered users");
        users = JSON.parse(window.localStorage.getItem("users"));
        console.log("Here are the previous users: ");
        console.log(users);
    } else {
        console.log("There were no previously registered users.");
    }
    
    users.push(newUser);
    console.log(users);
    window.localStorage.setItem("users", JSON.stringify(users));
    let thing = window.localStorage.getItem("users");
    console.log(JSON.parse(thing));
    let createSuccess = true;
    if(createSuccess){
        dispLogin("your account creation was successful");
    }
}

function dispLogin(message = false){
    console.log("entering display login");
    //sets up workspace
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    
    
    //username input
    let user = document.createElement("input");
    user.setAttribute("type", "text");
    user.setAttribute("placeholder", "username");
    user.setAttribute("id", "username");
    workspace.append(user);
    //password input
    let pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "password");
    pass.setAttribute("id", "password");
    workspace.append(pass);
    //button
    let button = document.createElement("button");
    let text = document.createTextNode("Enter");
    button.appendChild(text);
    workspace.append(button);
    //another button
    let button2 = document.createElement("button");
    let text2 = document.createTextNode("Create New Account");
    button2.appendChild(text2);
    button2.setAttribute("id", "new-account");
    workspace.append(button2);
    //header
    if(message){
        let h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode(message));
        workspace.append(h1);
    }
}