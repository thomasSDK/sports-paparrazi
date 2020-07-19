import React, { useState, useEffect } from "react";
import styled from 'styled-components'
const superagent = require("superagent");

// Split  to allow for greater flexibility in the request
const url =
  "https://api.unsplash.com/photos/random/?count=1&query=sport&orientation=portrait&client_id=";
const clientID = "eK3hqxpfSE979oi91j3VGsUERwEEj3YvGIOifB_5hfE";

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};

const photosUrl = `${url}${clientID}`;

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    simpleGet({
      url: photosUrl,
      // returns an array of photos
      onSuccess: (res) => {
        setPhotos(res.body);
        console.log(res.body)
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
