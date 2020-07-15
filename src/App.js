import React, { useState, useEffect} from 'react';
const superagent = require('superagent');

const clientID = "eK3hqxpfSE979oi91j3VGsUERwEEj3YvGIOifB_5hfE";

const simpleGet = options => {
  superagent.get(options.url).then(function(res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};

const url = "https://api.unsplash.com/photos/random/?count=1&query=sport&client_id="

function App() {
  const [photo, setPhoto] = useState({})
  
  useEffect(() => {
    const photosUrl = `${url}${clientID}`

    simpleGet({
      url: photosUrl,
      onSuccess: res => {
        setPhoto(res.body);
      }
    });
    console.log(photo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
