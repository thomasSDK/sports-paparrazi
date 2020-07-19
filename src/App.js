import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  const [photos, setPhotos] = useState(["hello"]);

  // useEffect(() => {
  //   simpleGet({
  //     url: photosUrl,
  //     // returns an array of photos
  //     onSuccess: (res) => {
  //       setPhotos(res.body);
  //       console.log(res.body);
  //     },
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <StyledApp>
      {photos.length === 0 ? (
        console.log("Loading time")
      ) : (
        <>
          <Reflection
            title={"footballl"}
            image={
              "https://images.unsplash.com/photo-1583262572082-732a51f9d92a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0ODU4M30"
            }
          />
          <StyledImage
            src={
              "https://images.unsplash.com/photo-1583262572082-732a51f9d92a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0ODU4M30"
            }
            alt={"foootballl"}
          />
          <TitleText>{"Hello Sport"}</TitleText>
          <a href={"www.google.com"}>
            <Name>@{"Thomas"}</Name>
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
  width: 30vw;
  height: 40vw;
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
