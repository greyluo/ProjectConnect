import React from 'react';
import { useState } from 'react';
import withAuth from './withAuth';



function ProjectPage(props){
    const [tasks, setTasks] = useState([{ id: 1, name: '',description:'', deadline:'', hours:''}]);
    const types = props.types;

    function addTask() {
        const newTask = { id: tasks.length + 1};
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function handleChange(id, name, hours, deadline, description) {
        setTasks(tasks.map(task => {
        if (task.id === id) {
            return { ...task, name, hours, deadline, description };
        } else {
            return task;
        }
        }));
    }
    function handleSubmit(event) {
        event.preventDefault();
        const requiredFields = event.target.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        });
        if (valid) {
        // Submit form data
        } else {
        alert('Please fill out all required fields.');
        }
    }
    return (
        <div>
            <h1>Project</h1>
            <form className='project' onSubmit={handleSubmit}>
                <label htmlFor='projectName'>Project Name</label>
                <input type='text' id='projectName' name='projectName' />

                <label htmlFor='projectDescription'>Project Description</label>
                <textarea name="description for your project" rows="2" cols="1" required></textarea>
                {/* <input type='text' id='projectDescription' name='projectDescription' /> */}

                <label htmlFor='projectType'>Project Type</label>
                <select id='projectType' name='projectType'>
                    <option value=''>Select</option>
                    {types["projectType"].map((type) => (
                        <option key={type.type} value={type.type}>{type.type}</option>
                    ))}
                </select>

                <label htmlFor='projectStatus'>Project Status</label>
                <input type="range" id="projectStatus" name="projectStatus" min="1" max="5" step="1">
                </input>
                <label htmlFor='projectStartDate'>Project Start Date</label>
                <input type='date' id='projectStartDate' name='projectStartDate' />

                <label htmlFor='projectEndDate'>Project Expected End Date</label>
                <input type='date' id='projectEndDate' name='projectEndDate' />

                <input type="hidden" name="status" />


                <label htmlFor='githubLink'>Github Link:</label>
                <input type='url' id='githubLink' name='githubLink' />
                <fieldset>
                    <legend>Task List</legend>
                        {tasks.map(task => (
                            <div key={task.id} className="task">
                                <label htmlFor={`task-${task.id}`}>Task:</label>
                                <input type="text" id={`task-${task.id}`} name="task[]" required value={task.name} onChange={event => handleChange(task.id, event.target.value)} />
                                <button type="button" onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        ))}
                    <button type="button" onClick={addTask}>+ Add Task</button>
                </fieldset>
                <label for="checkbox">close post</label>
                <input type="checkbox" id="checkbox" name="checkbox" value="true">
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );


}

export default withAuth(ProjectPage);
