  import './App.css';
  import Profile from './Profile';
  import { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Home from './home';
  import ProjectPage from './projectPage';
  import projectTypes from './data/ProjectTypes.json';
  // import NotFound from './NotFound';
  import React from 'react';


function App() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error(error));
  }, []);
  console.log(projectTypes)
  return(
    <div className = "App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/project-page" element={<ProjectPage types={projectTypes} />} />
            {/* <Route path="/*" element={<NotFound />} /> */}
          </Routes>

    </div>
  );
}
export default App;