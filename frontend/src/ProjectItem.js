import React from "react";
import { useState, useEffect } from "react";

function ProjectItem(project) {
    const [projectPreview, setPreview] = useState('');

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
        <h2>{projects.name}</h2>
        <p>{projectPreview}</p>
        <p>{projects.dueDate}</p>
        <p>{projects.status}</p>
        </div>
    );
}

export default ProjectItem;