//Loads form that gives user option to search for given movie
let loadSearch = function (userId) {
    //Sets up document variables and ensures innerHTML is empty
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
    searchButton.classList.add("active");
    if(favoriteButton.classList.contains("active")) {
        favoriteButton.classList.remove("active");   
    }
    if(profileButton.classList.contains("active")) {
        profileButton.classList.remove("active");   
    }
    
    //Creates input group divs
    let inputGroup1 = document.createElement("div");
    inputGroup1.classList = "input-group";
    let inputGroup2 = document.createElement("div");
    inputGroup2.classList = "input-group";
    let inputGroup3 = document.createElement("div");
    inputGroup3.classList = "input-group";
    
    //Search for title
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Title");
    inputTitle.setAttribute("id", "title");
    inputTitle.classList = "form-control search-input";
    inputGroup1.append(inputTitle);
    
    //Search for year
    let inputYear = document.createElement("input");
    inputYear.setAttribute("type", "text");
    inputYear.setAttribute("placeholder", "Year");
    inputYear.setAttribute("id", "year");
    inputYear.classList = "form-control search-input";
    inputGroup2.append(inputYear);
    
    //Search for type given certain options
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
    
    //Appends input groups for the search types
    workspace.append(inputGroup1);
    workspace.append(inputGroup2);
    workspace.append(inputGroup3);
    
    //Button to submit information
    let submitButton = document.createElement("button");
    submitButton.setAttribute("id", "search-movie");
    submitButton.appendChild(document.createTextNode("Search"));
    submitButton.classList = "btn btn-primary btn-block search-input";
    workspace.append(submitButton);
    
    //Sets onclick event for submit button - will get information from inputs and pass to getSearchInfo
    document.getElementById("search-movie").onclick = function () {
        let title = document.getElementById("title").value;
        let year = document.getElementById("year").value;
        let type = document.getElementById("type").value;
        getSearchInfo(userId, 1, title, year, type);
    };
    
}

//Gets movie information as parsed JSON and sends to display function
function getSearchInfo(userId, pageNum, title, year, type) {
    //Sets up request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let movieInfo = JSON.parse(this.responseText);
            displaySearchInfo(movieInfo, userId, pageNum, title, year, type);
        }
    };
    
    //Puts information in url
    let url = `https://www.omdbapi.com/?s=${title}&y=${year}&type=${type}&page=${pageNum}&apikey=3f5099b1`;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Displays search information returned by API request
//Will display warning if no returned information
function displaySearchInfo(movieInfo, userId, pageNum, title, year, type) {
    //Sets up document variables and ensures innerHTML is empty
    let workspace = document.getElementById("content");
    let error = document.getElementById("error");
    let top = document.getElementById("top");
    workspace.innerHTML = "";
    error.innerHTML = "";
    top.innerHTML = "";
    
    //Creates list group div to display results
    let listGroup = document.createElement("div");
    listGroup.classList.add("list-group");
    let users = JSON.parse(window.localStorage.getItem("users"));
    
    //Creates title
    top.classList = "top-styling";
    let h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(`Search Results`));
    h1.classList = "text-center top-message";
    top.append(h1);
    
    //If there are no results, then will display error message
    //If there are results, will display results
    if(movieInfo.Response == "False") {
        let error = document.getElementById("error");
        let p = document.createElement("p");
        p.classList = "text-center error-message";
        p.appendChild(document.createTextNode("No movies found, please search again."));
        error.append(p);
        
        //creates button to allow user to search again if there was an error
        let searchAgain = document.createElement("button");
        searchAgain.setAttribute("id", "search-again");
        searchAgain.appendChild(document.createTextNode("Search Again"));
        searchAgain.classList = "btn btn-primary btn-block";
        workspace.append(searchAgain);
        document.getElementById("search-again").onclick = loadSearch;
    } else {
        //for all of the returned movies, will display title and year
        for(let i = 0; i< movieInfo.Search.length; i++) {
            //creates list group item to store information
            let movie = document.createElement("div");
            movie.classList.add("list-group-item");
            id = movieInfo.Search[i].imdbID;
            movie.setAttribute("id", id);
            
            //gets the brief information - title and year
            let briefInfo = document.createElement("div");
            briefInfo.onclick = function() {requestMovieInfo(movie.getAttribute("id"), userId);};
            briefInfo.innerHTML = `${movieInfo.Search[i].Title} (${movieInfo.Search[i].Year})`;
            
            //creates favorite icon and sets initial image to the outlined heart
            let favoriteIcon = document.createElement("img");
            favoriteIcon.classList.add("favorite-icon");
            favoriteIcon.src = "img/heart_outline.png";
            //onclick event - will change favorites depending on whether movie was already favorited
            favoriteIcon.onclick = function() {changeFavorites(movie.getAttribute("id"), userId);};
            
            //if there were previously favorited items will check to see if returned movies were favorited
            //if they were favorited, then will display full heart
            if(users[userId].favorites && (users[userId].favorites.length != 0)){
                favorites = users[userId].favorites;
                for (let i=0; i<favorites.length; i++){
                    if(favorites[i] == movie.getAttribute("id")) {
                        favoriteIcon.classList.add("favorited");
                        favoriteIcon.src = "img/heart_filled.png";
                    }
                }
            }
            
            //appends content
            movie.appendChild(briefInfo);
            movie.appendChild(favoriteIcon);
            listGroup.appendChild(movie);
        }
        workspace.append(listGroup);
        
        //creates a button group to hold the moreResults and goBack buttons
        let buttonGroup = document.createElement("div");
        buttonGroup.classList = "button-group";
        let moreResults = document.createElement("button");
        moreResults.classList = "btn btn-primary";
        let goBack = document.createElement("button");
        goBack.classList = "btn btn-primary";
        
        //sets maximum number of pages based on total results
        let maxPage = Math.ceil(parseInt(movieInfo.totalResults) / 10);

        //if the user isn't on the first page, then allows user to display results from previous page
        if (pageNum > 1) {
            goBack.appendChild(document.createTextNode("Display previous results"));
            goBack.onclick = function() {getSearchInfo(userId, pageNum-1, title, year, type);};
            buttonGroup.append(goBack);
        }
        
        //if the user isn't on the last page, allows user to display more results from next page
        if (pageNum < maxPage) {
            moreResults.appendChild(document.createTextNode("Load more results"));
            moreResults.onclick = function() {getSearchInfo(userId, pageNum+1, title, year, type);};
            buttonGroup.append(moreResults);
        }
        workspace.append(buttonGroup);
        
    }
}
