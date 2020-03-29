import React, {useState} from 'react';
import './App.css';
import Search from './components/Search';
import axios from "axios";
import Results from './components/Results';

function App() {
  const apiUrl = "http://www.omdbapi.com/?apikey=aefdd5fb";
  
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const search = (e) => {
    if (e.key === "Enter") {
      axios.get(apiUrl + "&s=" + state.s).then( response  => {
        let results = response.data.Search;
        console.log(response.data.Search);
        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const handleChange = (e) => {
    let s = e.target.value;
    setState(prevState => {
      return {...prevState, s: s}
    });
    // console.log(state.s);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleChange={handleChange} search={search} />
        <Results results={state.results} />
      </main>
    </div>
  );
}

export default App;
