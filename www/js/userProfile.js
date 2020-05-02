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
}