let dispNewAccount = function(){
    console.log("entering display new account");
    //sets up workspace
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let bottom = document.getElementById("bottom");
    workspace.innerHTML = "";
    error.innerHTML = "";
    bottom.innerHTML = "";
    
    let form = document.createElement("form");
    let formGroup1 = document.createElement("div");
    formGroup1.classList.add("form-group");
    let formGroup2 = document.createElement("div");
    formGroup2.classList.add("form-group");
    
    //username input
    let user = document.createElement("input");
    user.setAttribute("type", "text");
    user.setAttribute("placeholder", "username");
    user.setAttribute("id", "new-username");
    user.classList.add("form-control");
    formGroup1.append(user);
    //password input
    let pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "password");
    pass.setAttribute("id", "new-password");
    pass.classList.add("form-control");
    formGroup2.append(pass);
    
    form.append(formGroup1);
    form.append(formGroup2);
    //button
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Create New Account"));
    button.addEventListener("click", createNewAccount);
    button.classList = "btn btn-primary btn-block";
    form.append(button);
    workspace.append(form);
    
    let hr = document.createElement("hr");
    let backButton = document.createElement("button");
    backButton.appendChild(document.createTextNode("Go back to login"));
    backButton.classList = "btn btn-primary btn-block";
    backButton.onclick = function () {dispLogin(false);};
    workspace.append(hr);
    workspace.append(backButton);
}

function createNewAccount(){
    let error = document.getElementById("error");
    error.innerHTML = "";
    let hasError = false;
    console.log("entering createNewAccount");
    let newUser = {
        username: document.getElementById("new-username").value,
        password: document.getElementById("new-password").value,
    };
    console.log(newUser);
    
    if(newUser.username == "" || newUser.password== "") {
        hasError = true;
        let message = document.createElement("p");
        message.appendChild(document.createTextNode("Please don't leave any of the fields empty."));
        error.append(message);
    }
    
    let users = [];
    if(localStorage.getItem("users")){
        console.log("There were previously registered users");
        users = JSON.parse(window.localStorage.getItem("users"));
        console.log("Here are the previous users: ");
        console.log(users);
        for(let i = 0; i<users.length;i++) {
            if(users[i].username == newUser.username) {
                let message = document.createElement("p");
                message.appendChild(document.createTextNode("This username already exists"));
                error.append(message);
                hasError = true;
            }
        }
    } else {
        console.log("There were no previously registered users.");
    }
    
    if(!hasError) {
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
}

function dispLogin(message = false){
    console.log("entering display login");
    //sets up workspace
    let top = document.getElementById("top");
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let bottom = document.getElementById("bottom");
    workspace.innerHTML = "";
    error.innerHTML = "";
    bottom.innerHTML = "";
    top.innerHTML = "";
    
    
    let h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("MyMovies"));
    h1.classList = "text-center top-message";
    top.append(h1);
    
    let form = document.createElement("form");
    let formGroup1 = document.createElement("div");
    formGroup1.classList.add("form-group");
    let formGroup2 = document.createElement("div");
    formGroup2.classList.add("form-group");
    
    //header
    if(message){
        let p = document.createElement("p");
        p.classList = "text-center error-message";
        p.appendChild(document.createTextNode(message));
        error.append(p);
    }
    
     //username input
    let user = document.createElement("input");
    user.setAttribute("type", "text");
    user.setAttribute("placeholder", "username");
    user.setAttribute("id", "username");
    user.classList.add("form-control");
    formGroup1.append(user);
    //password input
    let pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "password");
    pass.setAttribute("id", "password");
    pass.classList.add("form-control");
    formGroup2.append(pass);
    
    form.append(formGroup1);
    form.append(formGroup2);
    
    //button
    let button = document.createElement("button");
    button.setAttribute("id", "enter");
    button.appendChild(document.createTextNode("Enter"));
    button.classList = "btn btn-primary btn-block";
    form.append(button);
    workspace.append(form);
    
    let hr = document.createElement("hr");
    workspace.append(hr);
    
    //another button
    let button2 = document.createElement("button");
    button2.appendChild(document.createTextNode("Create New Account"));
    button2.setAttribute("id", "new-account");
    button2.classList = "btn btn-primary btn-block";
    workspace.append(button2);
    
    document.getElementById("enter").onclick = checkLogin;
    document.getElementById("new-account").onclick = dispNewAccount;
}

function checkLogin() {
    console.log("Entering checkLogin");
    let workspace = document.getElementById("error");
    workspace.innerHTML = "";
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let users = [];
    let username_found = false;
    let password_correct = false;
    let userId = 0;
    if(localStorage.getItem("users")){
        console.log("There were previously registered users");
        users = JSON.parse(window.localStorage.getItem("users"));
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == user) {
                username_found = true;
                console.log("username is correct");
                if (users[i].password == pass) {
                    console.log("password is also correct, login is successful");
                    password_correct = true;
                    userId = i;
                }
            }
        }
    } else {
        console.log("There were no previously registered users.");
    }
    
    let correct_login = username_found && password_correct;
    if(!correct_login) {
        dispLogin("Username or password is incorrect!");;
    } else {
        initializeApp(userId);
    }
}

function initializeApp(userId) {
    let top = document.getElementById("top");
    let content = document.getElementById("content");
    let error = document.getElementById("error");
    let workspace = document.getElementById("bottom");
    workspace.innerHTML = "";
    error.innerHTML = "";
    content.innerHTML = "";
    top.innerHTML = "";
    
    let header = document.createElement("div");
    header.classList.add("navbar");
    header.setAttribute("id", "header");
    
    let searchButton = document.createElement("button");
    searchButton.setAttribute("id", "search");
    searchButton.classList.add("tablinks");
    searchButton.appendChild(document.createTextNode("Search"));
                            
    let favoriteButton = document.createElement("button");
    favoriteButton.setAttribute("id", "favorite");
    favoriteButton.classList.add("tablinks");
    favoriteButton.appendChild(document.createTextNode("Favorites")); 
                               
    let profileButton = document.createElement("button");
    profileButton.setAttribute("id", "profile");
    profileButton.classList.add("tablinks");
    profileButton.appendChild(document.createTextNode("Profile"));
                              
    header.appendChild(searchButton);
    header.appendChild(favoriteButton);
    header.appendChild(profileButton);
    
    workspace.append(header);
    
    document.getElementById("search").onclick = function() {loadSearch(userId);};
    document.getElementById("favorite").onclick = function() {loadFavorites(userId);};
    document.getElementById("profile").onclick = function() {loadProfile(userId);};
    loadSearch(userId);
}