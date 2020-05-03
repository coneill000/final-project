let initializeApp = function() {
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    
    let header = document.createElement("div");
    header.classList.add("navbar");
    header.setAttribute("id", "header");
    
    let searchButton = document.createElement("button");
    searchButton.setAttribute("id", "search");
    searchButton.classList.add("tablinks");
    searchButton.appendChild(document.createTextNode("Search");
                            
    let favoriteButton = document.createElement("button");
    favoriteButton.setAttribute("id", "favorite");
    favoriteButton.classList.add("tablinks");
    favoriteButton.appendChild(document.createTextNode("Favorites"); 
                               
    let profileButton = document.createElement("button");
    profileButton.setAttribute("id", "profile");
    profileButton.classList.add("tablinks");
    profileButton.appendChild(document.createTextNode("Profile");
                              
    header.appendChild(searchButton);
    header.appendChild(favoriteButton);
    header.appendChild(profileButton);
    
    workspace.append(header);
}