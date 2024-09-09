const ProjectTable = ({ sortedData, requestSort, sortConfig }) => {
    return (
      <table style={{ border: '1px solid black', width: '100%', margin: '20px 0', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')} style={{ padding: '10px', cursor: 'pointer' }}>
              Project {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('budgetStatus.totalBudget')} style={{ padding: '10px', cursor: 'pointer' }}>
              Total Budget {sortConfig.key === 'budgetStatus.totalBudget' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('budgetStatus.spentToDate')} style={{ padding: '10px', cursor: 'pointer' }}>
              Spent to Date {sortConfig.key === 'budgetStatus.spentToDate' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('budgetStatus.budgetRemaining')} style={{ padding: '10px', cursor: 'pointer' }}>
              Budget Remaining {sortConfig.key === 'budgetStatus.budgetRemaining' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('scheduleAdherence.currentProgress')} style={{ padding: '10px', cursor: 'pointer' }}>
              Progress (%) {sortConfig.key === 'scheduleAdherence.currentProgress' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('resourceUtilization.utilizationPercentage')} style={{ padding: '10px', cursor: 'pointer' }}>
              Utilization (%) {sortConfig.key === 'resourceUtilization.utilizationPercentage' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('kpiTracking.currentValue')} style={{ padding: '10px', cursor: 'pointer' }}>
              KPI - Current Value {sortConfig.key === 'kpiTracking.currentValue' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((project) => (
            <tr key={project.id}>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.id}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.budgetStatus.totalBudget}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.budgetStatus.spentToDate}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.budgetStatus.budgetRemaining}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.scheduleAdherence.currentProgress}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.resourceUtilization.utilizationPercentage}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>
                {project.kpiTracking && project.kpiTracking.currentValue !== undefined
                  ? project.kpiTracking.currentValue
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ProjectTable;
  