import React, { Fragment, useEffect, useState } from "react";

import db from "../firebase";
import styled from "styled-components";
import { useParams } from "react-router";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    // Grab the movie info from db
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Save the movie data
          setMovie(doc.data());
        } else {
          // Redirect to home page
        }
      });
  }, []);

  return (
    <Container>
      {movie && (
        <Fragment>
          <Background>
            <img src={movie.backgroundImg} />
          </Background>
          <ImageTitle>
            <img src={movie.titleImg} />
          </ImageTitle>
          <Controls>
            <PlayButton>
              <img src="/images/play-icon-black.png" />
              <span>Play</span>
            </PlayButton>
            <TrailerButton>
              <img src="/images/play-icon-white.png" />
              <span>Trailer</span>
            </TrailerButton>
            <AddButton>
              <span>+</span>
            </AddButton>
            <GroupWatchButton>
              <img src="/images/group-icon.png" />
            </GroupWatchButton>
          </Controls>
          <Subtitle>{movie.subTitle}</Subtitle>
          <Description>{movie.description}</Description>
        </Fragment>
      )}
    </Container>
  );
}

export default Details;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  height: 40vh;
  min-height: 170px;
  width: 45vw;
  min-width: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.button`
  border-radius: 4px;
  font-size: 15px;
  margin-right: 22px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 42px;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddButton = styled.button`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  span {
    font-size: 30px;
    color: white;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Subtitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
`;
