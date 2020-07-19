import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useWindowSize } from "react-hooks-window-size";
import Emoji, { getRandomInt } from "./emoji";
const superagent = require("superagent");

// Split  to allow for greater flexibility in the request
const unSplashURL =
  "https://api.unsplash.com/photos/random/?count=1&query=sport&orientation=portrait&client_id=";
const unSplashClientID = "eK3hqxpfSE979oi91j3VGsUERwEEj3YvGIOifB_5hfE";

const emojiApiURL = "https://emoji-api.com/categories/people-body?access_key=";
const emojiApiID = "a81343835b9c7558bb80968e11728528a3f8384a";

const emojiURL = `${emojiApiURL}${emojiApiID}`;

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};

// Would be good to make this into an object
let emojiCodes = [];
const emojis = [];
let emojiCanvas;
let emojiContext;

simpleGet({
  url: emojiURL,
  onSuccess: (res) => {
    emojiCodes = res.body
      .filter((emoji) => emoji.subGroup === "person-sport")
      .map((emoji) => emoji.character);
    setInterval(
      () =>
        emojis.push(
          new Emoji(
            emojiCanvas.width,
            emojiCodes[getRandomInt(0, emojiCodes.length)]
          )
        ),
      500
    );
  },
});

function init(canvas) {
  emojiCanvas = canvas;
  emojiContext = canvas.getContext("2d");

  //https://www.html5rocks.com/en/tutorials/canvas/hidpi/
  var dpr = window.devicePixelRatio || 1;
  var rect = emojiCanvas.getBoundingClientRect();

  emojiCanvas.width = rect.width * dpr;
  emojiCanvas.height = rect.height * dpr;
  emojiContext.scale(dpr, dpr);
  window.requestAnimationFrame(draw);
}

function draw() {
  emojiContext.clearRect(0, 0, emojiCanvas.width, emojiCanvas.height); // clear canvas

  emojis.forEach((emoji, i) => {
    emojiContext.font = `${emoji.scale}px sans-serif`;
    emojiContext.fillText(emoji.code, emoji.x, emoji.y);
    emoji.draw();

    if (emoji.y > emojiCanvas.height) {
      emojis.splice(i, 1);
    }
  });

  window.requestAnimationFrame(draw);
}

// Pull into the react component to react to different screen widths
const photosUrl = `${unSplashURL}${unSplashClientID}`;

function App() {
  const size = useWindowSize();
  const [photos, setPhotos] = useState([]);
  let canvasRef = useRef();

  // Unsplash
  useEffect(() => {
    simpleGet({
      url: photosUrl,
      onSuccess: (res) => {
        setPhotos(res.body);
        console.log(res.body);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    init(canvasRef.current);
  }, []);

  return (
    <StyledApp>
      <StyledCanvas ref={canvasRef} />
      {photos.length === 0 ? (
        console.log("Loading time")
      ) : (
        <>
          <Reflection
            height={size.height * 0.5}
            width={size.height * 0.5 * 0.6}
            title={photos[0].alt_description}
            image={photos[0].urls.regular}
          />
          {/* Image does not display but left in for accessibility */}
          <StyledImage
            src={photos[0].urls.regular}
            alt={photos[0].alt_description}
          />
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

// CSS

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  height: 100vh;
  width: 100vw;
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
