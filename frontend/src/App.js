import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import { useState, useEffect } from 'react';
import Project from './projectPage';
import ProjectList from './ProjectList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import ProjectPage from './projectPage';


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
        <Router>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route
            path="/project-page"
            render={(routeProps) => (
              <ProjectPage {...routeProps} types={projectTypes} />
            )}
          />
        </Routes>
    </Router>
    </div>

  );
}

export default App;
