import React, {useState} from 'react';
import './App.css';
import Search from './components/Search';
import axios from "axios";
import Results from './components/Results';
import Popup from './components/Popup';

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
        // console.log(response.data.Search);
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

  const openPopup = id => {
    axios(apiUrl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
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
        {/* {state.s.length < 1 ? "hello" : ""} */}
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
