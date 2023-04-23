import React, { useState, useEffect } from 'react';
import data from './data/tech-stack.json';
import Select from 'react-select';
import ReactDOM from 'react-dom/client';



function Filter(){
    const programmingLanguages = data.programming_languages;
    const databaseEnvironments = data.database_environments;
    const cloudPlatforms = data.cloud_platforms;
    const webFrameworks = data.web_frameworks;
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedEnvironments, setSelectedEnvironments] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState([]);
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
      <div>
        <h2>Programming Languages</h2>
        <Select
          //total options
          options={languageOptions}
          value={selectedLanguages}
          onChange={handleSelectChangeLanguage}
          isMulti={true}
        />

        <h2>Database Environments</h2>
        <Select
          //total options
          options={environmentOptions}
          value={selectedEnvironments}
          onChange={handleSelectChangeEnvironment}
          isMulti={true}
        />

        <h2>Cloud Platforms</h2>
        <Select
          //total options
          options={platformOptions}
          value={selectedPlatforms}
          onChange={handleSelectChangePlatform}
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
          <h2>Selected Options for environment:</h2>
          <ul>
            {selectedEnvironments.map(environment => <li key={environment.value}>{environment.label}</li>)}
          </ul>
          <h2>Selected Options for platform:</h2>
          <ul>
            {selectedPlatforms.map(platform => <li key={platform.value}>{platform.label}</li>)}
          </ul>
          <h2>Selected Options for framework:</h2>
          <ul>
            {selectedFrameworks.map(framework => <li key={framework.value}>{framework.label}</li>)}
          </ul>
        </div>
      </div>
    );
  }

export default Filter;