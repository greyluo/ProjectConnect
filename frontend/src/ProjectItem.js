import React from "react";
import { useState, useEffect } from "react";
import Link from 'react-dom'

function ProjectItem(props) {
    const [projectPreview, setPreview] = useState('');
    const project = props.project;
    console.log(project)
  function truncateDescription(description) {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }

  useEffect(() => {
    const truncated = truncateDescription(project.project_description);
    setPreview(truncated);
  }, [project.project_description]);

  return (
        <div className="project-item">
        <h2>{project.project_name}</h2>
        {/* <p>{projectPreview}</p> */}
        <p>{project.project_end_date}</p>
        <p>{project.project_type}</p>
        {/* <Link to="/project?id=${project.id}"></Link> */}
        </div>
    );
}

export default ProjectItem;