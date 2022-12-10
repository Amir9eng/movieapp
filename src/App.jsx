import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import { useDebounce } from 'use-debounce'
import './App.css'
import logo from './assets/logo.svg'

function App () {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [value] = useDebounce(search, 500)

  useEffect(() => {
    axios(
      `https://www.omdbapi.com/?s=${
        search ? search : 'avengers'
      }&apikey=be30172b&type=movie`
    )
      .then(res => setMovies(res.data.Search))
      .catch()
  }, [value])

  console.log(movies)

  return (
    <div className='App'>
      <nav className='navbar'>
        <img src={logo} alt='logo' />
      </nav>
      <div className='hero'>
        <h2 className='heading'>Watch something incredible.</h2>
      </div>
      <div className='movie-container'>
        <label>Search</label>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
        />
        <p
          type='text'
          style={{
            marginBottom: '1.125rem',
            color: 'black',
            textTransform: 'capitalize'
          }}
        >
          {movies[0]?.Type ?? ''}
        </p>
        <div className='movie-box'>
          {movies !== undefined
            ? movies.map(movie => (
                <div
                  key={movie.imdbID}
                  className='movie-card'
                  style={{ backgroundImage: `url(${movie.Poster})` }}
                >
                  <p className='movie-name'>{movie.Title}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className='movie-container'>
        <p
          type='text'
          style={{
            marginBottom: '1.125rem',
            color: 'black',
            textTransform: 'capitalize'
          }}
        >
          {movies[0]?.Type ?? ''}
        </p>
        <div className='movie-box'>
          {movies !== undefined
            ? movies.map(movie => (
                <div
                  key={movie.imdbID}
                  className='movie-card'
                  style={{ backgroundImage: `url(${movie.Poster})` }}
                >
                  <p className='movie-name'>{movie.Title}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default App
