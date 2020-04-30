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
            dispMovieInfo(fullMovieInfo);
        }
    };
    
    let url = `http://www.omdbapi.com/?i=${movieId}&apikey=3f5099b1`;
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dispMovieInfo(fullMovieInfo) {
    console.log("Entering dispMovieInfo");
    let workspace = document.getElementById("content");
    let title = document.createElement("h1");
    title.innerHTML = fullMovieInfo.Title;
    let img = document.createElement("img");
    img.src = fullMovieInfo.Poster;
    workspace.append(title);
    workspace.append(img);
}