let loadSearch = function (userId) {
    console.log("Entering the loadSearch function");
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    document.getElementById("error").innerHTML = "";
    
    let searchButton = document.getElementById("search");
    let favoriteButton = document.getElementById("favorite");
    let profileButton = document.getElementById("profile");
    searchButton.classList.add("active");
    
    if(favoriteButton.classList.contains("active")) {
        favoriteButton.classList.remove("active");   
    }
    
    if(profileButton.classList.contains("active")) {
        profileButton.classList.remove("active");   
    }
    
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Title");
    inputTitle.setAttribute("id", "title");
    workspace.append(inputTitle);
    
    let inputYear = document.createElement("input");
    inputYear.setAttribute("type", "text");
    inputYear.setAttribute("placeholder", "Year");
    inputYear.setAttribute("id", "year");
    workspace.append(inputYear);
    
    let selectType = document.createElement("select");
    selectType.setAttribute("id", "type");
    let anyOption = document.createElement("option");
    anyOption.setAttribute("value", "");
    anyOption.appendChild(document.createTextNode("Type"));
    let movieOption = document.createElement("option");
    movieOption.setAttribute("value", "movie");
    movieOption.appendChild(document.createTextNode("Movie"));
    let seriesOption = document.createElement("option");
    seriesOption.setAttribute("value", "series");
    seriesOption.appendChild(document.createTextNode("Series"));
    let episodeOption = document.createElement("option");
    episodeOption.setAttribute("value", "episode");
    episodeOption.appendChild(document.createTextNode("Episode"));
    selectType.appendChild(anyOption);
    selectType.appendChild(movieOption);
    selectType.appendChild(seriesOption);
    selectType.appendChild(episodeOption);
    workspace.append(selectType);
    
    let submitButton = document.createElement("button");
    let text = document.createTextNode("Search");
    submitButton.setAttribute("id", "search-movie");
    submitButton.appendChild(text);
    workspace.append(submitButton);
    
    document.getElementById("search-movie").onclick = function () {
        let title = document.getElementById("title").value;
        let year = document.getElementById("year").value;
        let type = document.getElementById("type").value;
        getSearchInfo(userId, 1, title, year, type);
    };
}

function getSearchInfo(userId, pageNum, title, year, type) {
    console.log("Getting search info");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let movieInfo = JSON.parse(this.responseText);
            console.log(movieInfo);
            displaySearchInfo(movieInfo, userId, pageNum, title, year, type);
        }
    };
    
    let url = `https://www.omdbapi.com/?s=${title}&y=${year}&type=${type}&page=${pageNum}&apikey=3f5099b1`;
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function displaySearchInfo(movieInfo, userId, pageNum, title, year, type) {
    console.log("Entering the displaySearchInfo function");
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    let listGroup = document.createElement("div");
    listGroup.classList.add("list-group");
    let users = JSON.parse(window.localStorage.getItem("users"));
    
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
            
            if(users[userId].favorites && (users[userId].favorites.length != 0)){
                console.log("There were already favorited items: ");
                favorites = users[userId].favorites;
                for (let i=0; i<favorites.length; i++){
                    if(favorites[i] == movie.getAttribute("id")) {
                        favoriteIcon.classList.add("favorited");
                    }
                }
            }
            
            movie.appendChild(briefInfo);
            movie.appendChild(favoriteIcon);
            listGroup.appendChild(movie);
        }
        workspace.append(listGroup);
        let moreResults = document.createElement("button");
        let goBack = document.createElement("button");
        let maxPage = Math.ceil(parseInt(movieInfo.totalResults) / 10);
        console.log(maxPage);
        if (pageNum > 1) {
            goBack.appendChild(document.createTextNode("Display previous results"));
            goBack.onclick = function() {getSearchInfo(userId, pageNum-1, title, year, type);};
            workspace.append(goBack);
        }
        if (pageNum < maxPage) {
            moreResults.appendChild(document.createTextNode("Load more results"));
            moreResults.onclick = function() {getSearchInfo(userId, pageNum+1, title, year, type);};
            workspace.append(moreResults);
        }
        
        
    }
}
