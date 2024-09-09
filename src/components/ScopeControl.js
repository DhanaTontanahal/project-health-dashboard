import React from 'react';

// ScopeControl Component
const ScopeControl = ({ projects }) => {
    // Extract project data with change requests
    const projectData = Object.keys(projects).map(projectId => {
        const changeRequests = projects[projectId].scopeControl?.changeRequests || [];
        return {
            projectId,
            changeRequests,
        };
    });

    return (
        <div>
            <h2>Project Scope Control: Change Requests</h2>
            <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }}>
                <table border="1" width="100%" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Change Request Description</th>
                            <th>Impact (Time & Cost)</th>
                            <th>Approval Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.map((project) =>
                            project.changeRequests.map((request, index) => (
                                <tr key={`${project.projectId}-${index}`}>
                                    <td>{project.projectId}</td>
                                    <td>{request.description}</td>
                                    <td>{request.impact}</td>
                                    <td
                                        style={{
                                            color: request.approvalStatus === 'Approved' ? 'green' : 'orange',
                                        }}
                                    >
                                        {request.approvalStatus}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScopeControl;
