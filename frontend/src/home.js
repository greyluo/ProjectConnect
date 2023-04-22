import React from "react";
import { useState, useEffect } from "react";
import Project from './projectPage';
import ProjectList from './ProjectList';
import Profile from './Profile';


function Home(props) {
  const [projects, setProjects] = useState(null);
  const [projectTypes, setProjectTypes] = useState(null);



  return (

    <div className="home">
      <Profile></Profile>
        <button type="button" >New Project</button>
        <ProjectList projects={projects} types = {projectTypes}></ProjectList>
    </div>
  )

}

export default Home;