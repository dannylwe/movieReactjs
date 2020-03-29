import React, {useState} from 'react';
import './App.css';
import Search from './components/Search';

function App() {
  const apiUrl = "http://www.omdbapi.com/?apikey=aefdd5fb";
  
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

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
        <Search handleChange={handleChange} />
      </main>
    </div>
  );
}

export default App;
