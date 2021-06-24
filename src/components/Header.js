import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { useHistory } from "react-router";

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      history.push("/");
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src="images/home-icon.svg" />
              <span>HOME</span>
            </a>
            <a>
              <img src="images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="images/original-icon.svg" />
              <span>ORIGINAL</span>
            </a>
            <a>
              <img src="images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg src={userPhoto} onClick={signOut} />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.div`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }
    span {
      position: relative;
      font-size: 13px;
      letter-spacing: 1.2px;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform-origin: left center;
        transform: scaleX(0);
      }
    }
    &:hover {
      span::after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #000;
    background-color: #f9f9f9;
    border-color: transparent;
  }
`;
