import { useState } from "react";
import surfer from "./surfer.png"
function App() {
  const [search, setSearch] = useState(""); //For getting the user search
  const [results, setResults] = useState([]); //For defining the results with the API

  const handleSubmit = async e => {
    e.preventDefault(); //Prevent Refreshing
    if (search === "") return; //Prevent Empty Strings
    
    const endpoint =`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=25&srsearch=${search}`; //Calling Wikipedia API
    const response = await fetch(endpoint)

    if (!response.ok) { //Throw an error if the response isn't valid
      throw Error(response.statusText);
    }
    
    const json = await response.json(); //Get the search in json
    setResults(json.query.search); //Search in the json define results
  }

  return (
    <div className="App">
      
      <header>
      <img src={surfer} className="surf-icon" alt="Icon"></img>
        <h1>Wiki Surfer</h1>

        <form class="search-box" onSubmit={handleSubmit}> 
          <input type="search" placeholder='Search for Information!' value={search} onChange={e => setSearch(e.target.value)} /> {/*Define search with user Input*/}
        </form>

      </header>
      
      {results.map((result, i) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`; //The API doesn't get us an URL, insted I get an id, which I need to procces to get a valid URL
        return (
          <div className='results'>
          <div className='result' key={i}>
            <h2>{result.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: result.snippet + "..."}}></p>
            <a href={url} target="_blank" rel="noreferrer">Read more</a>
          </div>
      </div>
        )
      })}

    </div>
  );
}

export default App;
