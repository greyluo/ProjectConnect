import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import { useState, useEffect } from 'react';
import Project from './projectPage';
import ProjectList from './ProjectList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import ProjectPage from './projectPage';
import NotFound from './NotFound';


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
    fetch('/frontend/src/data/ProjectTypes.json')
      .then(response => response.json())
      .then(data => setProjectTypes(data))
      .catch(error => console.error(error));
  }, []);
  return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/project-page" element={<ProjectPage types={projectTypes} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
  );
}

export default App;