import fetch from "node-fetch"

const apiData = {
  url: 'https://api.themoviedb.org/3/',
  type: 'movie',
  id: '001574',
}

const {url, type, id} = apiData
const API_KEY = '964c3023860303f4cb3d17fa3814e4db'

const apiUrl = `${url}${type}/${id}?api_key=${API_KEY}`

fetch(apiUrl)
  .then((data) => data.json())
  .then( (movie) => generateHtml(movie) )

  const generateHtml = (data) => {
    const html = `
      <div className="movie-details">
        <img src='https://image.tmdb.org/t/p/w500/${data.poster_path}'
        <h2>${data.title}</h2>
      </div>
    `
  }
