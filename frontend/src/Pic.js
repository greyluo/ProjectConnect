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
      <div>
       <Link to="/profile">
            <img src={user.picture} alt={user.name} style={{ display: 'inline' }} />
        </Link>

<Routes>
                      <Route path="/Profile" element={<Profile />} />
          </Routes>      </div>


    ) : (
        <div>
            <LoginButton></LoginButton>
        </div>
    )
  );
};

export default Pic;