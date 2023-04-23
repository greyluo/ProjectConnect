import { useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import React from 'react';
function ProjectList(props) {
    const projects = props.projects;
<<<<<<< HEAD

=======
    console.log(projects)
>>>>>>> 951f9e7 (check)
    return (
        <div className="project-list">
            <h1>Projects</h1>
            
            {projects && props.projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
    );
}
export default ProjectList;