import React from "react";
import { useState, useEffect } from "react";
import Project from './projectPage';
import ProjectList from './ProjectList';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import data from './data/ProjectTypes.json';
import Select from 'react-select';
import ReactDOM from 'react-dom/client';
import Navigation from './navigation';
import { BrowserRouter, Route,Routes, Switch } from 'react-router-dom';

function Home(props) {
  const [projects, setProjects] = useState(null);
  const [projectTypes, setProjectTypes] = useState(null);

  useEffect(() => {
    fetch('http://projectconnect.tech/api/get_projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="home">
      <Navigation></Navigation>

      <Profile></Profile>
      <Link to="/project-page">
        <button  >New Project</button>
      </Link>
      <ProjectList projects={projects} types = {projectTypes}></ProjectList>
    </div>
  )

}


export default Home;