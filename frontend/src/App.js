import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import { useState, useEffect } from 'react';
import Project from './project';
import ProjectList from './ProjectList';



function App() {
  const [projects, setProjects] = useState(null);
  const [projectTypes, setProjectTypes] = useState(null);
  
  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    fetch('/frontend/src/data/data.json')
      .then(response => response.json())
      .then(data => setProjectTypes(data))
      .catch(error => console.error(error));
  }, []);



  return (
    <div className="App">
        <Profile></Profile>
        <button type="button" >New Project</button>
        <ProjectList projects={projects} types = {projectTypes}></ProjectList>
    </div>

  );
}

export default App;
