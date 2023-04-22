import React from "react";
import { useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";

function ProjectList(props) {
    const projects = props.projects;
    return (
        <div className="project-list">
            {projects && props.projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
    );
}
export default ProjectList;