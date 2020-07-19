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
    <StyledApp>
      {photos.length === 0 ? (
        console.log("Loading time")
      ) : (
        <>
          <StyledImage src={photos[0].urls.regular} alt={photos[0].alt_description} />
          <TitleText>{photos[0].description}</TitleText>
          <a href={photos[0].user.portfolio_url}>
            <p>@{photos[0].user.name}</p>
          </a>
        </>
      )}
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const StyledImage = styled.img`
  width: 30vw
`

const TitleText = styled.h1`
font-family: Moonhouse, serif;
`