function requestMovieInfo(movieId, userId) {
    console.log("Entering dispMovieInfo");
    console.log(movieId);
    
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let fullMovieInfo = JSON.parse(this.responseText);
            console.log(fullMovieInfo);
            dispMovieInfo(fullMovieInfo, userId);
        }
    };
    
    let url = `http://www.omdbapi.com/?i=${movieId}&apikey=3f5099b1`;
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
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

function dispMovieInfo(fullMovieInfo, userId) {
    console.log("Entering dispMovieInfo");
    let workspace = document.getElementById("content");
    let title = document.createElement("h1");
    title.innerHTML = `${fullMovieInfo.Title} (${fullMovieInfo.Year})`;
    let users = JSON.parse(window.localStorage.getItem("users"));
    let favorites = [];
    
    let favoriteIcon = document.createElement("p");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.appendChild(document.createTextNode("Favorites"));
    favoriteIcon.onclick = function() {changeFavorites(fullMovieInfo.imdbID, userId);};

    if(users[userId].favorites && (users[userId].favorites.length != 0)){
        console.log("There were already favorited items: ");
        favorites = users[userId].favorites;
        for (let i=0; i<favorites.length; i++){
            if(favorites[i] == fullMovieInfo.imdbID) {
                favoriteIcon.classList.add("favorited");
            }
        }
    }
    
    let img = document.createElement("img");
    img.src = fullMovieInfo.Poster;
    workspace.append(title);
    workspace.append(favoriteIcon);
    workspace.append(img);
    
    let rating = fullMovieInfo.Rated;
    let runtime = fullMovieInfo.Runtime;
    let genre = fullMovieInfo.Genre;
    let info = document.createElement("p");
    info.innerHTML = `${rating} | ${runtime} | ${genre}`;
    workspace.append(info);
    
    let plot = document.createElement("p");
    plot.innerHTML = `${fullMovieInfo.Plot}`;
    workspace.append(plot);
    
    let hr = document.createElement("hr");
    workspace.append(hr);
    
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