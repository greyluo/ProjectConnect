import React from "react";
import { useState, useEffect } from "react";
import Link from "react-dom"

function ProjectItem(props) {
    const [projectPreview, setPreview] = useState('');
    const project = props.project;

  function truncateDescription(description) {
    const words = project.projectDescription.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }

  useEffect(() => {
    const truncated = truncateDescription(project.projectDescription);
    setPreview(truncated);
  }, [project.projectDescription]);

    return (
        <div className="project-item">
        <h2>{project.name}</h2>
        <p>{projectPreview}</p>
        <p>{project.dueDate}</p>
        <p>{project.status}</p>
        <Link to='/project-detail-${id}'></Link>
        </div>
    );
}

export default ProjectItem;