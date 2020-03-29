import React, {useState} from 'react';
import './App.css';
import Search from './components/Search';
import axios from "axios";
import Results from './components/Results';
import Popup from './components/Popup';
import Next from './components/Next';

function App() {
  const apiUrl = "https://www.omdbapi.com/?apikey=aefdd5fb";
  
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    pages: 0,
    currPage: 1
  });

  const search = (e) => {
    if (e.key === "Enter") {
      // clear memory
      localStorage.clear();
      state.results = [];

      axios.get(apiUrl + "&s=" + state.s).then( response  => {
        if(response.data.Search){
          let results = response.data.Search;
          console.log(response);
          let pages = Math.round(response.data.totalResults / 10);
          setState(prevState => {
            return { ...prevState, pages: pages, results: results}
          });
        }
      });
    }
  }

  const nextPage = () => {
    let number = parseInt(state.currPage) + 1;
    localStorage.setItem('pageNumber', number);
    let pages = parseInt(state.pages) - 1;
    axios.get(apiUrl + "&s=" + state.s + "&page=" + number).then(res => {
      setState(prevState => {
        return { 
          ...prevState, 
          results: res.data.Search, 
          currPage:localStorage.getItem('pageNumber'), 
          pages: pages 
        }
      });
    });
  }

  const handleChange = (e) => {
    let s = e.target.value;
    setState(prevState => {
      return {...prevState, s: s}
    });
    // console.log(state.s);
  }

  const openPopup = id => {
    axios(apiUrl + "&i=" + id).then(({ data }) => {
      setState(prevState => {
        return { ...prevState, selected: data }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleChange={handleChange} search={search} />
        {/* TODO: Add now showing TV shows and movies using https://thetvdb.com/api-information API and 
        https://www.themoviedb.org/documentation/api */}
        <Results results={state.results} openPopup={openPopup} />
        {state.pages > 1 ? <Next nextPage={nextPage} pages={state.pages} /> : false }
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
