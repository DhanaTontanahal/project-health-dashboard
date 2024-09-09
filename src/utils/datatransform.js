export const  transformProjectData=(data)=> {
    const transformedData = {};
  
    // Loop through each project in the original data
    for (const projectId in data) {
      const project = data[projectId];
  
      // Extract the necessary KPI tracking data (currentValue, trendIndicator)
      if (project.kpiTracking) {
        transformedData[projectId] = {
          kpiTracking: {
            currentValue: project.kpiTracking.currentValue,
            trendIndicator: project.kpiTracking.trendIndicator,
          },
        };
      }
    }

    console.log(transformedData)
  
    return transformedData;
  }

  export const  generateScheduleVarianceData=(originalData)=> {
    const projectData = {};
  
    // Loop through each project in the original data
    for (const projectId in originalData) {
      const project = originalData[projectId];
  
      // Check if scheduleAdherence exists in the project data
      if (project.scheduleAdherence && project.scheduleAdherence.scheduleVariance !== undefined) {
        projectData[projectId] = {
          scheduleAdherence: {
            scheduleVariance: project.scheduleAdherence.scheduleVariance,
          },
        };
      }
    }
  
    return projectData;
  }
  


  export const  transformToHealthIndexData=(originalData)=> {
    let transformedData = {};
  
    for (const projectId in originalData) {
      const project = originalData[projectId];
  
      transformedData[projectId] = {
        scheduleAdherence: {
          scheduleVariance: project.scheduleAdherence.scheduleVariance,
          milestones: project.scheduleAdherence.milestones.map(m => ({
            name: m.name,
            status: m.status
          }))
        },
        resourceUtilization: {
          utilizationPercentage: project.resourceUtilization.utilizationPercentage,
          capacityAlert: project.resourceUtilization.capacityAlert
        },
        scopeControl: {
          changeRequests: project.scopeControl.changeRequests.map(c => ({
            description: c.description,
            impact: c.impact,
            approvalStatus: c.approvalStatus
          })),
          scopeVariance: project.scopeControl.scopeVariance
        },
        kpiTracking: {
          currentValue: project.kpiTracking.currentValue,
          trendIndicator: project.kpiTracking.trendIndicator,
          targetValue: project.kpiTracking.targetValue
        }
      };
    }
  
    return transformedData;
  }