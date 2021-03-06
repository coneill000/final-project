let loadFavorites = function(userId) {
    console.log("Entering the loadSearch function");
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    document.getElementById("error").innerHTML = "";
    
    let searchButton = document.getElementById("search");
    let favoriteButton = document.getElementById("favorite");
    let profileButton = document.getElementById("profile");
    favoriteButton.classList.add("active");
    
    if(searchButton.classList.contains("active")) {
        searchButton.classList.remove("active");   
    }
    
    if(profileButton.classList.contains("active")) {
        profileButton.classList.remove("active");   
    }
    
    dispFavorites(userId);
}

function dispFavorites(userId) {
    console.log("Entering the dispFavorite function");
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    let listGroup = document.createElement("div");
    listGroup.classList.add("list-group");
    let users = JSON.parse(window.localStorage.getItem("users"));
    
    top.classList = "top-styling";
    let h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(`${users[userId].username}'s Favorites`));
    h1.classList = "text-center top-message";
    top.append(h1);
    
    if(users[userId].favorites && (users[userId].favorites.length != 0)) {
        let favorites = users[userId].favorites;
        console.log("There were already favorited items: ");
        for (let i=0; i<favorites.length; i++) {
            let xmlhttp = new XMLHttpRequest();
            let movieId = favorites[i];
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let movieInfo = JSON.parse(this.responseText);
                    let movie = document.createElement("div");
                    movie.classList.add("list-group-item");
                    movie.setAttribute("id", movieId);

                    let briefInfo = document.createElement("div");
                    briefInfo.innerHTML = `${movieInfo.Title} (${movieInfo.Year})`;
                    briefInfo.onclick = function() {requestMovieInfo(movieId, userId);};

                    let favoriteIcon = document.createElement("img");
                    favoriteIcon.classList.add("favorite-icon");
                    favoriteIcon.src = "img/heart_outline.png";
                    //favoriteIcon.appendChild(document.createTextNode("Favorites"));
                    favoriteIcon.onclick = function() {
                        changeFavorites(movie.getAttribute("id"), userId);
                        loadFavorites(userId);
                    };

                    if(users[userId].favorites && (users[userId].favorites.length != 0)){
                        console.log("There were already favorited items: ");
                        favorites = users[userId].favorites;
                        for (let i=0; i<favorites.length; i++){
                            if(favorites[i] == movie.getAttribute("id")) {
                                favoriteIcon.classList.add("favorited");
                                favoriteIcon.src = "img/heart_filled.png";
                            }
                        }
                    }
                    movie.appendChild(briefInfo);
                    movie.appendChild(favoriteIcon);
                    listGroup.appendChild(movie);
                }
            };

            let url = `https://www.omdbapi.com/?i=${movieId}&apikey=3f5099b1`;

            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        
    } else {
        error.innerHTML = "<p>No favorites, add some to your list!</p>";
    }
    
    workspace.append(listGroup);
}