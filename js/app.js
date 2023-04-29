const form = document.querySelector('.header__form');
const searchInput = document.querySelector("#search");
const moviesContainer = document.querySelector("#movies");

const API_KEY = "cf01455d-120e-4143-9b8c-8d51103b2941";
const API_URL_PREMIER = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=APRIL";
const API_URL_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_URL_TOP_100 = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_RELEASES = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=APRIL&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";


getMovies(API_URL_TOP_100);

async function getMovies(url) {
   const response = await fetch(url, {
      headers: {
         "Content-Type": "application/json",
         "X-API-KEY": API_KEY,
      }
   });
   const dataResp = await response.json();

   showMovies(dataResp);
}

function showMovies(data) {
   document.querySelector("#movies").innerHTML = "";

   data.films.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.classList.add("main__movie");
      movieItem.innerHTML = `
         <div class="movie__content">
         <img src="${movie.posterUrl}" alt="${movie.nameRu}" class="movie__poster">
         <div class="movie__poster--dark"></div>
      </div>
      <div class="movie__info">
         <div class="movie__title">${movie.nameRu} (${movie.year})</div>
         <div class="movie__genre">${movie.genres.map((genre) =>
         ` ${genre.genre}`
      )}</div>
      <div class="movie__rating">${movie.rating}</div>
      `
      moviesContainer.appendChild(movieItem);
   });
}

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const searchApiUrl = `${API_URL_SEARCH}${searchInput.value}`;

   if (searchInput.value) {
      getMovies(searchApiUrl);
   }

   searchInput.value = "";
})


