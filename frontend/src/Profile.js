import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./logoutButton";

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
    isAuthenticated ? (
      <div>

        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
        <LogoutButton></LogoutButton>
        <div className = "bio">
          <h2>Biography:</h2>
          <input value = {bio} placeholder="Your bio here" onChange={event =>handleBioChange(event.target.value)}/>
        </div>

      </div>

    ) : (
        <div>
            <LoginButton></LoginButton>
        </div>
    )
  );
};

export default Profile;
