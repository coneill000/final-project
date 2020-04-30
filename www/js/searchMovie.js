let loadSearch = function () {
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
    
    document.getElementById("search-movie").onclick = getSearchInfo;
}

function getSearchInfo() {
    title = document.getElementById("title").value;
    console.log("Getting search info");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let movieInfo = JSON.parse(this.responseText);
            console.log(movieInfo);
            displaySearchInfo(movieInfo);
        }
    };
    
    let url = `https://www.omdbapi.com/?s=${title}&apikey=3f5099b1`;
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function displaySearchInfo(movieInfo) {
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
            movie.onclick = dispMovieInfo;
            movie.innerHTML = `${movieInfo.Search[i].Title} (${movieInfo.Search[i].Year})`;
            listGroup.appendChild(movie);
        }
        workspace.append(listGroup);
    }
}