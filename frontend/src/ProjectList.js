import React from "react";
import { useState, useEffect } from "react";

function ProjectList(projects) {
    return (
        <div className="project-list">
            {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
}

export default ProjectList;