import React from 'react';
import { Container, Navbar, Button, InputGroup } from 'react-bootstrap';

import data from './data/tech-stack.json';
import Select from 'react-select';
import ReactDOM from 'react-dom/client';

export default function App() {
  return (
    <Navbar bg="light" variant="light">
      <Container fluid>
        <InputGroup tag="form" className="d-flex w-auto mb-3">
          <input className="form-control" placeholder="Type projects" aria-label="Search" type="Search" />
          <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </Container>
    </Navbar>
  );
}

function Search(){
  const programmingLanguages = data.programming_languages;
  const databaseEnvironments = data.database_environments;
  const cloudPlatforms = data.cloud_platforms;
  const webFrameworks = data.web_frameworks;
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedEnvironments, setSelectedEnvironments] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);

  useEffect(() => {
    //do the rendering every time the sets are changed, replace console.log if needed
    console.log("hello")
    // setSelectedLanguages([]);
    // setSelectedFrameworks([]);
  }, [selectedLanguages,selectedEnvironments,selectedPlatforms,selectedFrameworks]);

  const handleSelectChangeLanguage = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };
  const handleSelectChangeEnvironment = (selectedOptions) => {
    setSelectedEnvironments(selectedOptions);
  };
  const handleSelectChangeLanguage = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };

  const handleSelectChangeFramework = (selectedOptions) => {
    setSelectedFrameworks(selectedOptions);
  };

  const languageOptions = programmingLanguages.map(language => {
    return { value: language.name, label: language.name }
  });

  const frameworkOptions = webFrameworks.map(framework => {
    return { value: framework.name, label: framework.name }
  });

  return (
    <div>
      <h2>Programming Languages</h2>
      <Select
        //total options
        options={languageOptions}
        value={selectedLanguages}
        onChange={handleSelectChangeLanguage}
        isMulti={true}
      />

      <h2>Web Frameworks</h2>
      <Select
        options={frameworkOptions}
        value={selectedFrameworks}
        onChange={handleSelectChangeFramework}
        isMulti={true}
      />

      <div>
        <h2>Selected Options for language:</h2>
        <ul>
          {selectedLanguages.map(language => <li key={language.value}>{language.label}</li>)}
        </ul>
        <h2>Selected Options for framework:</h2>
        <ul>
          {selectedFrameworks.map(framework => <li key={framework.value}>{framework.label}</li>)}
        </ul>
      </div>
    </div>
  );
}
