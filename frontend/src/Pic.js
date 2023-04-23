import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./logoutButton";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import Profile from './Profile';


const Pic = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      //  <Link to="/profile">
      //       <img src={user.picture} alt={user.name} style={{ display: 'inline' }} />
      //   </Link>
//       <h3>
//        <Link to="/profile">{user.name}</Link>
//       </h3>
      <Link to="/profile" style={{ display: 'inline-block' }}>
        <img src={user.picture} alt={user.name} style={{ display: 'inline-block' }} />
        <span style={{ display: 'inline-block', marginLeft: '10px' }}>{user.name}</span>
      </Link>
    ) : (
        <div>
            <LoginButton></LoginButton>
        </div>
    )
  );
};

export default Pic;