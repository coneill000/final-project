//Will set up enviroment to load favorites list
let loadFavorites = function(userId) {
    //Sets up document variables
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    top.classList.remove('top-styling');
    
    //Ensures that proper tab button is highlighted as active
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
    
    //Displays list of favorites
    dispFavorites(userId);
}

//Will display all favorited movies
function dispFavorites(userId) {
    //sets up document variables
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    
    //sets up listgroup to hold favorites
    let listGroup = document.createElement("div");
    listGroup.classList.add("list-group");
    let users = JSON.parse(window.localStorage.getItem("users"));
    
    //Sets up title
    top.classList = "top-styling";
    let h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(`${users[userId].username}'s Favorites`));
    h1.classList = "text-center top-message";
    top.append(h1);
    
    //Checks to see if there were previously favorited items
    //If there were, then will request short information to display
    //If not, will give user an error message
    if(users[userId].favorites && (users[userId].favorites.length != 0)) {
        //initilizes favorites list from local storage
        let favorites = users[userId].favorites;
        
        //for each movie in favorites, will display
        for (let i=0; i<favorites.length; i++) {
            let xmlhttp = new XMLHttpRequest();
            let movieId = favorites[i];
            //API request
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let movieInfo = JSON.parse(this.responseText);
                    //list group item
                    let movie = document.createElement("div");
                    movie.classList.add("list-group-item");
                    movie.setAttribute("id", movieId);
                    //brief information - title and year
                    let briefInfo = document.createElement("div");
                    briefInfo.innerHTML = `${movieInfo.Title} (${movieInfo.Year})`;
                    briefInfo.onclick = function() {requestMovieInfo(movieId, userId);};
                    //Favorite icon and click event
                    let favoriteIcon = document.createElement("img");
                    favoriteIcon.classList.add("favorite-icon");
                    favoriteIcon.src = "img/heart_outline.png";
                    favoriteIcon.onclick = function() {
                        changeFavorites(movie.getAttribute("id"), userId);
                        loadFavorites(userId);
                    };
                    //Ensures that favorited are displayed with full heart
                    if(users[userId].favorites && (users[userId].favorites.length != 0)){
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
            //url for request
            let url = `https://www.omdbapi.com/?i=${movieId}&apikey=3f5099b1`;
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    } else {
        //displays error if no favorites
        let p = document.createElement("p");
        p.classList = "text-center error-message";
        p.appendChild(document.createTextNode("You don't have any favorites. Add some by clicking on the heart outline in search results!"));
        error.append(p);
    }
    
    workspace.append(listGroup);
}