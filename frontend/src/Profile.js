
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./logoutButton";
import'./Profile.css';  //import custom css style

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();



  //for biography
  const [bio, setBio] = useState("");
  const handleBioChange = (bio) => {
    const newBio = [...bio];
    setBio(...bio,newBio);
  };



  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="profile">
    {/* {isAuthenticated ? ( */}
      <div className = "user">
        <img src={user.picture} alt={user.name} />
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
        <LogoutButton></LogoutButton>
        <div className = "bio">
          <h2>Biography:</h2>
          <input value = {bio} placeholder="Your bio here" onChange={event =>handleBioChange(event.target.value)}/>
        </div>

      </div>
{/*
    ) : (
        <div>
            <LoginButton></LoginButton>
        </div>
    )} */}
    </div>
  );
};

export default Profile;

