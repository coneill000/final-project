//This file contains functions that deal account creation and logging in

//displays the create account page
let dispNewAccount = function(){
    
    //sets up main document variables and clears the innerHTML
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let bottom = document.getElementById("bottom");
    workspace.innerHTML = "";
    error.innerHTML = "";
    bottom.innerHTML = "";
    
    //general form tag and form group divs
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
    
    //Append username and password form groups to main form
    form.append(formGroup1);
    form.append(formGroup2);
    
    //Account creation button
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Create New Account"));
    button.addEventListener("click", createNewAccount);
    button.classList = "btn btn-primary btn-block";
    form.append(button);
    workspace.append(form);
    
    //Back to login button
    let hr = document.createElement("hr");
    let backButton = document.createElement("button");
    backButton.appendChild(document.createTextNode("Go back to login"));
    backButton.classList = "btn btn-primary btn-block";
    backButton.onclick = function () {dispLogin(false);};
    workspace.append(hr);
    workspace.append(backButton);
}

//Checks the values in account creation form and adds account to local storage if there are no errors
function createNewAccount(){
    //Sets up main variables 
    let error = document.getElementById("error");
    error.innerHTML = "";
    let hasError = false;
    let users = [];
    
    //Creates new user object based on entered information
    let newUser = {
        username: document.getElementById("new-username").value,
        password: document.getElementById("new-password").value,
    };

    //Checks to see if form as empty values
    if(newUser.username == "" || newUser.password== "") {
        hasError = true;
        let message = document.createElement("p");
        message.appendChild(document.createTextNode("Please don't leave any of the fields empty."));
        error.append(message);
    }
    
    //Checks local storage to see if there were previously registered users
    //If there were then checks to make sure that username is not taken
    if(localStorage.getItem("users")){
        for(let i = 0; i<users.length;i++) {
            if(users[i].username == newUser.username) {
                let message = document.createElement("p");
                message.appendChild(document.createTextNode("This username already exists"));
                error.append(message);
                hasError = true;
            }
        }
    }
    
    //If there were no errors found during account creation process, will add new account and return user to login
    if(!hasError) {
        users.push(newUser);
        window.localStorage.setItem("users", JSON.stringify(users));
        dispLogin("your account creation was successful");
    }
}

//Displays login page with optional message
function dispLogin(message = false){
    //sets up document variables and ensures innerHTML is empty
    let top = document.getElementById("top");
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let bottom = document.getElementById("bottom");
    workspace.innerHTML = "";
    error.innerHTML = "";
    bottom.innerHTML = "";
    top.innerHTML = "";
    
    //creates title section to put name of app
    top.classList = "top-styling";
    let h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("MyMovies"));
    h1.classList = "text-center top-message";
    top.append(h1);
    
    //creates form and form-group divs
    let form = document.createElement("form");
    let formGroup1 = document.createElement("div");
    formGroup1.classList.add("form-group");
    let formGroup2 = document.createElement("div");
    formGroup2.classList.add("form-group");
    
    //if there is a message, displays message
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
    
    //appends username and password form groups to main form
    form.append(formGroup1);
    form.append(formGroup2);
    
    //Sign-in button
    let button = document.createElement("button");
    button.setAttribute("id", "enter");
    button.appendChild(document.createTextNode("Enter"));
    button.classList = "btn btn-primary btn-block";
    form.append(button);
    workspace.append(form);
    
    //Account creation button
    let hr = document.createElement("hr");
    workspace.append(hr);
    let button2 = document.createElement("button");
    button2.appendChild(document.createTextNode("Create New Account"));
    button2.setAttribute("id", "new-account");
    button2.classList = "btn btn-primary btn-block";
    workspace.append(button2);
    
    //Sets click events for the login and account creation buttons
    document.getElementById("enter").onclick = checkLogin;
    document.getElementById("new-account").onclick = dispNewAccount;
}

//Checks that the login information matches existing users
function checkLogin() {
    //Sets up document variables
    let workspace = document.getElementById("error");
    workspace.innerHTML = "";
    
    //gets username and password from input
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    
    //Sets up important variables
    let users = [];
    let username_found = false;
    let password_correct = false;
    let userId = 0;
    
    //Checks to see if there were previously registered users
    //If there were, then the "users" array will be set to previously registered users (if not, then will have empty array)
    //Will also check to see if the username and password is correct
    if(localStorage.getItem("users")){
        users = JSON.parse(window.localStorage.getItem("users"));
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == user) {
                username_found = true;
                if (users[i].password == pass) {
                    password_correct = true;
                    userId = i;
                }
            }
        }
    }
    
    //Allows for correct login only if a username is found and the corresponding password matches
    //If incorrect, then will redisplay login with error message
    //If correct, will display main app
    let correct_login = username_found && password_correct;
    if(!correct_login) {
        dispLogin("Username or password is incorrect!");;
    } else {
        initializeApp(userId);
    }
}

//Displays main app, including bottom navigation
//Set to initilize to the search tab
function initializeApp(userId) {
    //Sets up document variables and ensures innerHTML is empty
    let top = document.getElementById("top");
    let content = document.getElementById("content");
    let error = document.getElementById("error");
    let workspace = document.getElementById("bottom");
    workspace.innerHTML = "";
    error.innerHTML = "";
    content.innerHTML = "";
    top.innerHTML = "";
    top.classList.remove("top-styling");
    
    //Creates bottom navigation
    let header = document.createElement("div");
    header.classList = "navbar btn-group";
    header.setAttribute("id", "header");
    
    //creates tab that will go to search function
    let searchButton = document.createElement("button");
    searchButton.setAttribute("id", "search");
    searchButton.classList = "navlinks btn";
    searchButton.appendChild(document.createTextNode("Search"));

    //creates tab that will go to favorite's page
    let favoriteButton = document.createElement("button");
    favoriteButton.setAttribute("id", "favorite");
    favoriteButton.classList = "navlinks btn";
    favoriteButton.appendChild(document.createTextNode("Favorites")); 
    
    //Creates tab that will go to profile function
    let profileButton = document.createElement("button");
    profileButton.setAttribute("id", "profile");
    profileButton.classList = "navlinks btn";
    profileButton.appendChild(document.createTextNode("Profile"));
    
    //Appends tabs to navigation
    header.appendChild(searchButton);
    header.appendChild(favoriteButton);
    header.appendChild(profileButton);
    
    //Append navigation to main content
    workspace.append(header);
    
    //Sets up onclick listeners for each tab, initializes to search function
    document.getElementById("search").onclick = function() {loadSearch(userId);};
    document.getElementById("favorite").onclick = function() {loadFavorites(userId);};
    document.getElementById("profile").onclick = function() {loadProfile(userId);};
    loadSearch(userId);
}