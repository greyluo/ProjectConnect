import React from 'react';
import { useState } from 'react';
function Project(types)
{
    const [status, setStatus] = useState('open');
    return (
        <div>
            <h1>Project</h1>
            <form className='project' action='/api/update-project' onSubmit={handleSubmit}>
                <label htmlFor='projectName'>Project Name</label>
                <input type='text' id='projectName' name='projectName' />

                <label htmlFor='projectDescription'>Project Description</label>
                <input type='text' id='projectDescription' name='projectDescription' />
                <label htmlFor='projectType'>Project Type</label>
                <select id='projectType' name='projectType'>
                    <option value=''>Select</option>
                    {types.map((type) => (
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
                <button type="submit" disabled={status === 'closed' || !projectName || !projectDescription || !projectType || !projectStartDate || !projectEndDate}>Submit</button>
</form>
        </div>
    );

}

export default Project;