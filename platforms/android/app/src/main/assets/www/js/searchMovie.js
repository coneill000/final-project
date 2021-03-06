let loadSearch = function (userId) {
    console.log("Entering the loadSearch function");
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    
    top.classList.remove('top-styling');
    
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
    
    let inputGroup1 = document.createElement("div");
    inputGroup1.classList = "input-group";
    let inputGroup2 = document.createElement("div");
    inputGroup2.classList = "input-group";
    let inputGroup3 = document.createElement("div");
    inputGroup3.classList = "input-group";
    
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Title");
    inputTitle.setAttribute("id", "title");
    inputTitle.classList = "form-control search-input";
    inputGroup1.append(inputTitle);
    
    let inputYear = document.createElement("input");
    inputYear.setAttribute("type", "text");
    inputYear.setAttribute("placeholder", "Year");
    inputYear.setAttribute("id", "year");
    inputYear.classList = "form-control search-input";
    inputGroup2.append(inputYear);
    
    let selectType = document.createElement("select");
    selectType.setAttribute("id", "type");
    selectType.classList = "form-control search-input";
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
    inputGroup3.append(selectType);
    
    workspace.append(inputGroup1);
    workspace.append(inputGroup2);
    workspace.append(inputGroup3);
    
    let submitButton = document.createElement("button");
    submitButton.setAttribute("id", "search-movie");
    submitButton.appendChild(document.createTextNode("Search"));
    submitButton.classList = "btn btn-primary btn-block search-input";
    
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
    h1.appendChild(document.createTextNode(`Search Results`));
    h1.classList = "text-center top-message";
    top.append(h1);
    
    if(movieInfo.Response == "False") {
        let error = document.getElementById("error");
        let p = document.createElement("p");
        p.classList = "text-center error-message";
        p.appendChild(document.createTextNode("No movies found, please search again."));
        error.append(p);
        
        let searchAgain = document.createElement("button");
        searchAgain.setAttribute("id", "search-again");
        searchAgain.appendChild(document.createTextNode("Search Again"));
        searchAgain.classList = "btn btn-primary btn-block";
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
            
            let favoriteIcon = document.createElement("img");
            favoriteIcon.classList.add("favorite-icon");
            favoriteIcon.src = "img/heart_outline.png";
            //favoriteIcon.appendChild(document.createTextNode("Favorites"));
            favoriteIcon.onclick = function() {changeFavorites(movie.getAttribute("id"), userId);};
            
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
        workspace.append(listGroup);
        
        let buttonGroup = document.createElement("div");
        buttonGroup.classList = "button-group";
        let moreResults = document.createElement("button");
        moreResults.classList = "btn btn-primary";
        let goBack = document.createElement("button");
        goBack.classList = "btn btn-primary";
        let maxPage = Math.ceil(parseInt(movieInfo.totalResults) / 10);
        console.log(maxPage);
        if (pageNum > 1) {
            goBack.appendChild(document.createTextNode("Display previous results"));
            goBack.onclick = function() {getSearchInfo(userId, pageNum-1, title, year, type);};
            buttonGroup.append(goBack);
        }
        if (pageNum < maxPage) {
            moreResults.appendChild(document.createTextNode("Load more results"));
            moreResults.onclick = function() {getSearchInfo(userId, pageNum+1, title, year, type);};
            buttonGroup.append(moreResults);
        }
        workspace.append(buttonGroup);
        
    }
}
