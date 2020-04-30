let loadSearch = function (userId) {
    console.log("Entering the loadSearch function");
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    document.getElementById("error").innerHTML = "";
    
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Title");
    inputTitle.setAttribute("id", "title");
    workspace.append(inputTitle);
    
    let button = document.getElementById("search");
    button.classList.add("active");
    
    let searchButton = document.createElement("button");
    let text = document.createTextNode("Search");
    searchButton.setAttribute("id", "search-movie");
    searchButton.appendChild(text);
    workspace.append(searchButton);
    
    document.getElementById("search-movie").onclick = function () {getSearchInfo(userId);};
}

function getSearchInfo(userId) {
    title = document.getElementById("title").value;
    console.log("Getting search info");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let movieInfo = JSON.parse(this.responseText);
            console.log(movieInfo);
            displaySearchInfo(movieInfo, userId);
        }
    };
    
    let url = `https://www.omdbapi.com/?s=${title}&apikey=3f5099b1`;
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function displaySearchInfo(movieInfo, userId) {
    console.log("Entering the displaySearchInfo function");
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    let listGroup = document.createElement("div");
    listGroup.classList.add("list-group");
    
    if(movieInfo.Response == "False") {
        let error = document.getElementById("error");
        error.innerHTML = "<p>No movies found, please search again</p>"
        let searchAgain = document.createElement("button");
        searchAgain.setAttribute("id", "search-again");
        searchAgain.appendChild(document.createTextNode("Search Again"));
        workspace.append(searchAgain);
        document.getElementById("search-again").onclick = loadSearch;
    } else {
        for(let i = 0; i< movieInfo.Search.length; i++) {
            let movie = document.createElement("div");
            movie.classList.add("list-group-item");
            id = movieInfo.Search[i].imdbID;
            movie.setAttribute("id", id);
            
            let briefInfo = document.createElement("div");
            briefInfo.onclick = function() {requestMovieInfo(movie.getAttribute("id"), userId);};
            briefInfo.innerHTML = `${movieInfo.Search[i].Title} (${movieInfo.Search[i].Year})`;
            
            let favoriteIcon = document.createElement("p");
            favoriteIcon.classList.add("favorite-icon");
            favoriteIcon.appendChild(document.createTextNode("Favorites"));
            favoriteIcon.onclick = function() {changeFavorites(movie.getAttribute("id"), userId);};
            movie.appendChild(briefInfo);
            movie.appendChild(favoriteIcon);
            listGroup.appendChild(movie);
        }
        workspace.append(listGroup);
    }
}

function changeFavorites(id, userId) {
    console.log(`Entering changeFavorites with id ${id}`);
    let favoriteIcon = document.getElementById(id).getElementsByClassName("favorite-icon")[0];
    let favorites = [];
    let previouslyFavorited = false;
    let match = 0;
    let users = JSON.parse(window.localStorage.getItem("users"));
    console.log(users);
    
    if(users[userId].favorites && (users[userId].favorites.length != 0)){
        console.log("There were already favorited items: ");
        console.log(users[userId].favorites);
        favorites = users[userId].favorites;
        for (let i=0; i<favorites.length; i++){
            if(favorites[i] == id) {
                previouslyFavorited = true;
                match = i;
            }
        }
    } else {
        console.log("There were no previously favorited movies");
    }
    
    if(previouslyFavorited) {
        console.log("the item was already favorited");
        favorites.splice(match, 1);
        favoriteIcon.classList.remove("favorited");
    } else {
        console.log("The item hasn't been favorited");
        favorites.push(id);
        favoriteIcon.classList.add("favorited");
    }
    
    users[userId].favorites = favorites;
    console.log(`favorites after change ${favorites}`);
    window.localStorage.setItem("users", JSON.stringify(users));
    let thing = window.localStorage.getItem("users");
    console.log(JSON.parse(thing));
}