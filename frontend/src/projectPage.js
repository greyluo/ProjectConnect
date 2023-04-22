import React from 'react';
import { useState } from 'react';
import withAuth from './withAuth';
function ProjectPage(types)
{
    const [status, setStatus] = useState('open');
    function closePost() {
        setStatus('closed');
    }

    return (

        <div>
            <h1>Project</h1>
            <form className='project' action='/api/update-project' method='POST'>
                <label htmlFor='projectName'>Project Name</label>
                <input type='text' id='projectName' name='projectName' />

                <label htmlFor='projectDescription'>Project Description</label>
                <input type='text' id='projectDescription' name='projectDescription' />
                <label htmlFor='projectType'>Project Type</label>
                <select id='projectType' name='projectType'>
                    <option value=''>Select</option>
                    {types && types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <label htmlFor='projectStatus'>Project Status</label>
                <input type='text' id='projectStatus' name='projectStatus' />

                <label htmlFor='projectStartDate'>Project Start Date</label>
                <input type='text' id='projectStartDate' name='projectStartDate' />

                <label htmlFor='projectEndDate'>Project Expected End Date</label>
                <input type='text' id='projectEndDate' name='projectEndDate' />

                <input type="hidden" name="status" value={status} />

                <button type="button" onClick={closePost}>Close Project</button>
                {/* if status is closed, then disable the submit button */}
                {/* if not filled out, then disable the submit button */}
                <button type="submit" disabled={status === 'closed'}>Submit</button>
            </form>
        </div>
    );

}

export default withAuth(ProjectPage);