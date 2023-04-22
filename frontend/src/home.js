import React from "react";
import { useState, useEffect } from "react";
import Project from './projectPage';
import ProjectList from './ProjectList';
import { Link } from 'react-router-dom';
import Profile from './Profile';


function Home(props) {
  const [projects, setProjects] = useState(null);
  const [projectTypes, setProjectTypes] = useState(null);
  return (
    <div className="home">
      <Profile></Profile>
      <Link to="/project—page">
        <button  >New Project</button>
      </Link>
      <ProjectList projects={projects} types = {projectTypes}></ProjectList>
    </div>
  )

}

export default Home;