const apiKey = "c6d2a585"
let moviesArray = JSON.parse(localStorage.getItem("myMovieWatchlist"))|| []
const movieEl = document.getElementById("movies")

window.addEventListener("load", renderWatchlist())

function renderWatchlist(){
    if(moviesArray.length > 0){
        render(moviesArray)
    }else{
        movieEl.innerHTML = `
            <h2>Your watchlist is looking a little empty</h2>
            <a href="index.html" >Let's add some movies!</a>
        `
    }
}

function render(id){
    let movielist = ""
    for(films of id){
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${films}`)
            .then(res => res.json())
            .then(data =>{
                for(movie of [data]){
                    movielist += `
                        <div class="movie-main">
                            <img class="movie-image" src=${movie.Poster}/>
                            <div class="movie-content">
                                <div class="movie-content-top"> 
                                    <span class="movie-title">${movie.Title}</span>
                                    <img src=images/Star-Icon.svg />
                                    <span class="movie-rating">${movie.imdbRating}</span>
                                </div>
                                <div class="movie-content-middle">
                                    <span class="movie-runtime">${movie.Runtime}</span>
                                    <span class="movie-genre">${movie.Genre}</span>
                                    <div class="add-div">
                                        <img  class="add-icon" src=images/remove.svg />
                                        <span class= "add-btn" data-remove="${movie.imdbID}" >Remove</span>
                                    </div>
                                </div>
                                <div class="movie-content-bottom">
                                    <p class="movie-plot">${movie.Plot}</p>
                                </div>
                            </div>
                        </div>
                        <hr class="divider">
                    `
                }
                movieEl.innerHTML = `<div class = "adjust">${movielist}</div>`
            })
    }
}

document.addEventListener("click", function(event){
    if(event.target.dataset.remove){
        removeMovie(event.target.dataset.remove)
    }
})

function removeMovie(id){
    if(moviesArray.includes(id)){
        moviesArray.splice(moviesArray.indexOf(`${id}`), 1)
        localStorage.setItem("myMovieWatchlist", JSON.stringify(moviesArray))
        renderWatchlist()
    }
}