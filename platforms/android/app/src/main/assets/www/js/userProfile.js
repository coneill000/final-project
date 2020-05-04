function loadProfile(userId) {
    console.log("Entering the loadProfile function");
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    
    top.classList.remove("top-styling");
    
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
    
    let logoutButton = document.createElement("button");
    logoutButton.appendChild(document.createTextNode("Logout"));
    logoutButton.classList = "btn btn-primary btn-block";
    logoutButton.onclick = function () {
        console.log("trying to logout");
        dispLogin("Logout successful");
    };
    workspace.append(logoutButton);
    
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete Account"));
    deleteButton.classList = "btn btn-primary btn-block";
    deleteButton.onclick = function () {
        deleteAccount(userId);
    };
    workspace.append(deleteButton);
}

function deleteAccount(userId) {
    console.log("Entering deleteAccount function");
    let users = JSON.parse(window.localStorage.getItem("users"));
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    let confirmMessage = document.createElement("p");
    confirmMessage.appendChild(document.createTextNode("Are you sure you want to delete your account?"));
    confirmMessage.classList = "text-center";
    let confirmButton = document.createElement("button");
    confirmButton.appendChild(document.createTextNode("Yes, delete my account."));
    confirmButton.classList = "btn btn-primary btn-block";
    confirmButton.onclick = function () {
        console.log(`Deleting account at index ${userId}`);
        users.splice(userId, 1);
        window.localStorage.setItem("users", JSON.stringify(users));
        let thing = window.localStorage.getItem("users");
        console.log(JSON.parse(thing));
        dispLogin("Account deleted");
    };
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