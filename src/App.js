import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWindowSize } from 'react-hooks-window-size'
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
  const size = useWindowSize()
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    simpleGet({
      url: photosUrl,
      // returns an array of photos
      onSuccess: (res) => {
        setPhotos(res.body);
        console.log(res.body);
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
          <Reflection
            height={size.height * 0.5}
            width={(size.height* 0.5) * 0.6}
            title={photos[0].alt_description}
            image={
              photos[0].urls.regular
            }
          />
          <StyledImage src={photos[0].urls.regular} alt={photos[0].alt_description} />
          <TitleText>{photos[0].description}</TitleText>
          <a href={photos[0].user.portfolio_url}>
            <Name>@{photos[0].user.name}</Name>
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
`;

const TitleText = styled.h1`
  font-family: Moonhouse, serif;
  z-index: 1;
`;

const Name = styled.p`
  position: relative;
  z-index: 1;
`;

const StyledImage = styled.img`
  display: none;
`;

const Reflection = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  background:url("${(props) => props.image}");
  background-position: bottom;
  background-size: cover;
  box-shadow: 0px 50px 70px rgba(0,0,0,0.3),
              0px 10px 10px rgba(0,0,0,0.1);
  &:after {
    content:"";
    background-image: inherit;
    width:inherit;
    height:40%;
    position: absolute;
    bottom:-41%;
    transform: scaleY(-1);
    background-position: bottom;
    background-size: cover;
    opacity: 0.5;
  }
  &:before {
    content:"";
    width:inherit;
    height: 42%;
    position: absolute;
    bottom: -42%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3),white);
    z-index: 1;
    
  }
`;
