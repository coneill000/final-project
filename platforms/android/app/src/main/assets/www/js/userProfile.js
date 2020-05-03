function loadProfile(userId) {
    console.log("Entering the loadProfile function");
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    document.getElementById("error").innerHTML = "";
    
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
    logoutButton.onclick = function () {
        console.log("trying to logout");
        dispLogin("Logout successful");
    };
    workspace.append(logoutButton);
    
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete Account"));
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
    let confirmButton = document.createElement("button");
    confirmButton.appendChild(document.createTextNode("Yes, delete my account."));
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
    backButton.onclick = function () {
        loadProfile(userId);
    };
    
    workspace.append(confirmMessage);
    workspace.append(confirmButton);
    workspace.append(backButton);
    
}