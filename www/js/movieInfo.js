//Uses API to request detailed information about particular movie
function requestMovieInfo(movieId, userId) {
    //Sets up document variable
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    
    //Sets up request, if successful, will pass full information to display function
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let fullMovieInfo = JSON.parse(this.responseText);
            console.log(fullMovieInfo);
            dispMovieInfo(fullMovieInfo, userId);
        }
    };
    
    //Inputs movie id into url
    let url = `https://www.omdbapi.com/?i=${movieId}&apikey=3f5099b1`;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Will "unfavorite" a title that is already favorited and will "favorite" a title that isn't favorited
function changeFavorites(id, userId) {
    //Sets up main variables
    let favoriteIcon = document.getElementsByClassName("favorite-icon")[0];
    let favorites = [];
    let previouslyFavorited = false;
    let match = 0;
    let users = JSON.parse(window.localStorage.getItem("users"));
    
    //Checks if movie was already favorited
    if(users[userId].favorites && (users[userId].favorites.length != 0)){
        favorites = users[userId].favorites;
        for (let i=0; i<favorites.length; i++){
            if(favorites[i] == id) {
                previouslyFavorited = true;
                match = i;
            }
        }
    } 
    
    //If the movie was previously favorited, then will remove from favorites
    //If not then will add to favorites
    if(previouslyFavorited) {
        favorites.splice(match, 1);
        favoriteIcon.classList.remove("favorited");
        favoriteIcon.src = "img/heart_outline.png";
    } else {
        favorites.push(id);
        favoriteIcon.classList.add("favorited");
        favoriteIcon.src = "img/heart_filled.png";
    }
    
    //updates user favorites
    users[userId].favorites = favorites;
    window.localStorage.setItem("users", JSON.stringify(users));
}

//Displays full movie information including title, year, poster, genre, runtime, rating, etc. 
function dispMovieInfo(fullMovieInfo, userId) {
    //Sets up document variables
    let workspace = document.getElementById("content");
    let title = document.createElement("h1");
    title.classList = "text-center";
    title.innerHTML = `${fullMovieInfo.Title} (${fullMovieInfo.Year})`;
    let users = JSON.parse(window.localStorage.getItem("users"));
    let favorites = [];
    
    //Sets up favorite icon
    let favoriteDiv = document.createElement("div");
    favoriteDiv.classList = "d-flex justify-content-center";
    let favoriteIcon = document.createElement("img");
    favoriteIcon.src = "img/heart_outline.png";
    favoriteIcon.classList.add("favorite-icon");
    
    //Will set favorite icon to full heart if movie was previously favorited
    if(users[userId].favorites && (users[userId].favorites.length != 0)){
        favorites = users[userId].favorites;
        for (let i=0; i<favorites.length; i++){
            if(favorites[i] == fullMovieInfo.imdbID) {
                favoriteIcon.classList.add("favorited");
                favoriteIcon.src = "img/heart_filled.png";
            }
        }
    }
    
    //Sets onclick event for favorite icon
    favoriteDiv.onclick = function() {changeFavorites(fullMovieInfo.imdbID, userId);};
    
    //Displays poster image
    let imgDiv = document.createElement("div");
    imgDiv.classList = "d-flex justify-content-center";
    let img = document.createElement("img");
    img.src = fullMovieInfo.Poster;
    img.classList = "img-poster";
    imgDiv.append(img);
    
    //Appends title, favoriteIcon, and poster to content
    workspace.append(title);
    favoriteDiv.append(favoriteIcon);
    workspace.append(favoriteDiv);
    workspace.append(imgDiv);
    
    //Displays rating, runtime, and gere information
    let rating = fullMovieInfo.Rated;
    let runtime = fullMovieInfo.Runtime;
    let genre = fullMovieInfo.Genre;
    let info = document.createElement("p");
    info.innerHTML = `${rating} | ${runtime} | ${genre}`;
    info.classList = "text-center";
    workspace.append(info);
    
    //Displays plot
    let plot = document.createElement("p");
    plot.innerHTML = `${fullMovieInfo.Plot}`;
    workspace.append(plot);
    let hr = document.createElement("hr");
    workspace.append(hr);
    
    //Displays important people and awards
    let director = document.createElement("p");
    director.innerHTML = `Directed by: ${fullMovieInfo.Director}`;
    let writer = document.createElement("p");
    writer.innerHTML = `Written by: ${fullMovieInfo.Writer}`;
    let actor = document.createElement("p");
    actor.innerHTML = `Actors: ${fullMovieInfo.Actors}`;
    let awards = document.createElement("p");
    awards.innerHTML = `Awards: ${fullMovieInfo.Awards}`;
    
    workspace.append(director);
    workspace.append(writer);
    workspace.append(actor);
    workspace.append(awards);
    
}