//displays user profile page 
function loadProfile(userId) {
    //document variables
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    top.classList.remove("top-styling");

    //Ensures that proper tab button is highlighted as active
    let searchButton = document.getElementById("search");
    let favoriteButton = document.getElementById("favorite");
    let profileButton = document.getElementById("profile");
    profileButton.classList.add("active");
    if(favoriteButton.classList.contains("active")) {
        favoriteButton.classList.remove("active");   
    }
    if(searchButton.classList.contains("active")) {
        searchButton.classList.remove("active");   
    }
    
    //creates button to let user to logout of account
    //after logout, will display login screen with success message
    let logoutButton = document.createElement("button");
    logoutButton.appendChild(document.createTextNode("Logout"));
    logoutButton.classList = "btn btn-primary btn-block";
    logoutButton.onclick = function () {
        dispLogin("Logout successful");
    };
    workspace.append(logoutButton);
    
    //creates button to delete account
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete Account"));
    deleteButton.classList = "btn btn-primary btn-block";
    deleteButton.onclick = function () {
        deleteAccount(userId);
    };
    workspace.append(deleteButton);
}

//Handles account deletion
function deleteAccount(userId) {
    //Main variables
    let users = JSON.parse(window.localStorage.getItem("users"));
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    
    //Creates confirmation message to display to user
    let confirmMessage = document.createElement("p");
    confirmMessage.appendChild(document.createTextNode("Are you sure you want to delete your account?"));
    confirmMessage.classList = "text-center";
    
    //Creates button that allows user to delete account
    //Once account is deleted, will display login screen with success message
    let confirmButton = document.createElement("button");
    confirmButton.appendChild(document.createTextNode("Yes, delete my account."));
    confirmButton.classList = "btn btn-primary btn-block";
    confirmButton.onclick = function () {
        users.splice(userId, 1);
        window.localStorage.setItem("users", JSON.stringify(users));
        let thing = window.localStorage.getItem("users");
        console.log(JSON.parse(thing));
        dispLogin("Account deleted");
    };
    
    //Creates button that allows user to stop the account deletion
    let backButton = document.createElement("button");
    backButton.appendChild(document.createTextNode("No, I've decided to keep my account"));
    backButton.classList = "btn btn-primary btn-block";
    backButton.onclick = function () {
        loadProfile(userId);
    };
    
    workspace.append(confirmMessage);
    workspace.append(confirmButton);
    workspace.append(backButton);
    
}