const apiKey = "c6d2a585"
 
const formInput = document.getElementById("form-input")
const formBtn = document.getElementById("form-btn")
const moviesEl = document.getElementById("movies")
const form = document.getElementById("form")
let moviesArray = JSON.parse(localStorage.getItem("myMovieWatchlist"))|| []

document.addEventListener("click", function(event){
    if(event.target.dataset.add){
        pushMovie(event.target.dataset.add)
    }
})

form.addEventListener("submit",function(event){
    event.preventDefault()
    renderMovies()
})

function pushMovie(id){
    if(!moviesArray.includes(id)){
        moviesArray.push(id)
    }
    localStorage.setItem("myMovieWatchlist", JSON.stringify(moviesArray))
}

function renderMovies(){
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${formInput.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.Search){
                const movieId = data.Search.map(movie => movie.imdbID)
                getMovie(movieId)
            }
            else{
                moviesEl.innerHTML = `<p id="error">Unable to find what you’re looking for. Please try another search</p>`
            }
        })
}

function getMovie(id){
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
                                        <img  class="add-icon" src=images/add-Icon.png />
                                        <span class= "add-btn" data-add="${movie.imdbID}"  >Watchlist</span>
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
                moviesEl.innerHTML = `<div class = "adjust">${movielist}</div>`
            })
    }
}