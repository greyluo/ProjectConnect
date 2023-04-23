import React from 'react';
import { Container, Navbar, Button, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import data from './data/tech-stack.json';
import Select from 'react-select';
import ReactDOM from 'react-dom/client';

// export default function App() {
//   return (
//     <Navbar bg="light" variant="light">
//       <Container fluid>
//         <InputGroup tag="form" className="d-flex w-auto mb-3">
//           <input className="form-control" placeholder="Type projects" aria-label="Search" type="Search" />
//           <Button variant="outline-secondary">Search</Button>
//         </InputGroup>
//       </Container>
//     </Navbar>
//   );
// }

function Navigation(){
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
  const handleSelectChangePlatform = (selectedOptions) => {
    setSelectedPlatforms(selectedOptions);
  };

  const handleSelectChangeFramework = (selectedOptions) => {
    setSelectedFrameworks(selectedOptions);
  };

  const languageOptions = programmingLanguages.map(language => {
    return { value: language.name, label: language.name }
  });

  const environmentOptions = databaseEnvironments.map(environment => {
    return { value: environment.name, label: environment.name }
  });

  const platformOptions =  cloudPlatforms.map(platform => {
    return { value: platform.name, label: platform.name }
  });

  const frameworkOptions = webFrameworks.map(framework => {
    return { value: framework.name, label: framework.name }
  });

  return (

    <div style={{ marginTop: '200px' }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    marginLeft: '100px', marginRight: '450px' }}>
      <div style={{ marginRight: '20px' }}>
        <div style={{ marginBottom: '5px', color: '#333', fontFamily: 'Arial', fontWeight: 'bold', textShadow: '1px 1px #eee' }}>Programming Languages</div>
        <Select
          options={languageOptions}
          value={selectedLanguages}
          onChange={handleSelectChangeLanguage}
          isMulti={true}
          styles={{
            control: (provided) => ({
              ...provided,
              fontSize: '10px',
              minHeight: '10px',
              width: '200px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            menu: (provided) => ({
              ...provided,
              width: '200px',
              backgroundColor: '#fff',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            option: (provided) => ({
              ...provided,
              fontSize: '10px',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
          }}
        />
      </div>
      <div style={{ marginRight: '20px' }}>
        <div style={{ marginBottom: '5px', color: '#333', fontFamily: 'Arial', fontWeight: 'bold', textShadow: '1px 1px #eee' }}>Database Environments</div>
        <Select
          options={environmentOptions}
          value={selectedEnvironments}
          onChange={handleSelectChangeEnvironment}
          isMulti={true}
          styles={{
            control: (provided) => ({
              ...provided,
              fontSize: '10px',
              minHeight: '10px',
              width: '200px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            menu: (provided) => ({
              ...provided,
              width: '200px',
              backgroundColor: '#fff',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            option: (provided) => ({
              ...provided,
              fontSize: '10px',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
          }}
        />
      </div>
      <div style={{ marginRight: '20px' }}>
        <div style={{ marginBottom: '5px', color: '#333', fontFamily: 'Arial', fontWeight: 'bold', textShadow: '1px 1px #eee' }}>Cloud Platforms</div>
        <Select
          options={platformOptions}
          value={selectedPlatforms}
          onChange={handleSelectChangePlatform}
          isMulti={true}
          styles={{
            control: (provided) => ({
              ...provided,
              fontSize: '10px',
              minHeight: '10px',
              width: '200px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            menu: (provided) => ({
              ...provided,
              width: '200px',
              backgroundColor: '#fff',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            option: (provided) => ({
              ...provided,
              fontSize: '10px',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
          }}
          />
        </div>
        <div style={{ marginRight: '20px' }}>
        <div style={{ marginBottom: '5px', color: '#333', fontFamily: 'Arial', fontWeight: 'bold', textShadow: '1px 1px #eee' }}>Web Frameworks</div>
        <Select
          options={frameworkOptions}
          value={selectedFrameworks}
          onChange={handleSelectChangeFramework}
          isMulti={true}
          styles={{
            control: (provided) => ({
              ...provided,
              fontSize: '10px',
              minHeight: '10px',
              width: '200px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            menu: (provided) => ({
              ...provided,
              width: '200px',
              backgroundColor: '#fff',
              boxShadow: '1px 1px 3px #ccc',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
            option: (provided) => ({
              ...provided,
              fontSize: '10px',
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#333'
            }),
          }}
          />
          </div>
          </div>
          </div>





    );

    {/* <div>
    <div class="mt-8" style={{width: 300}}>
    <div className="position-absolute top-10 start-100 translate-middle"></div>
      Selected Options for Languages
    </div>
      <ul>
        {selectedLanguages.map(language => <li key={language.value}>{language.label}</li>)}
      </ul>
    <div class="mt-8" style={{width: 300}}>
    <div className="position-absolute top-10 start-100 translate-middle"></div>
        Selected Options for Environments
    </div>
      <ul>
        {selectedEnvironments.map(environment => <li key={environment.value}>{environment.label}</li>)}
      </ul>
    <div class="mt-8" style={{width: 300}}>
    <div className="position-absolute top-10 start-100 translate-middle"></div>
        Selected Options for Platforms
    </div>
      <ul>
        {selectedPlatforms.map(platform => <li key={platform.value}>{platform.label}</li>)}
      </ul>
    <div class="mt-8" style={{width: 300}}>
    <div className="position-absolute top-10 start-100 translate-middle"></div>
        Selected Options for Frameworks
    </div>
      <ul>
        {selectedFrameworks.map(framework => <li key={framework.value}>{framework.label}</li>)}
      </ul>
    </div>
  </div> */}





}



export default Navigation;

