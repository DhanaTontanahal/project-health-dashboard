export const data = {
    "projects": {
      "project1": {
        "budgetStatus": {
          "totalBudget": 100000,
          "spentToDate": 45000,
          "budgetRemaining": 55000,
          "costVariance": 3000,
          "budgetAlert": "enabled"
        },
        "scheduleAdherence": {
          "projectStartDate": "2023-01-01",
          "plannedEndDate": "2023-12-31",
          "currentProgress": 65,
          "milestones": [
            {
              "name": "Design",
              "dueDate": "2023-03-15",
              "status": "Completed"
            },
            {
              "name": "Development",
              "dueDate": "2023-08-01",
              "status": "On track"
            }
          ],
          "scheduleVariance": 5
        },
        "resourceUtilization": {
          "resourceAllocation": "John Doe, Jane Smith",
          "plannedResourceHours": 500,
          "actualResourceHours": 420,
          "utilizationPercentage": 84,
          "capacityAlert": "none"
        },
        "scopeControl": {
          "scopeDescription": "Develop a new mobile app",
          "changeRequests": [
            {
              "description": "Add feature X",
              "impact": "3 days, $2000",
              "approvalStatus": "Approved"
            }
          ],
          "scopeVariance": 2
        },
        "kpiThresholds": {
          "customKPITargets": {
            "budget": 90,
            "utilization": 85,
            "taskCompletion": 95
          },
          "kpiAlerts": {
            "budget": "enabled",
            "utilization": "enabled"
          }
        },
        "kpiTracking": {
          "kpiName": "Project Performance",
          "measurementPeriod": "Weekly",
          "owner": "John Doe",
          "currentValue": 88,
          "targetValue": 95,
          "trendIndicator": "up"
        }
      },
      "project2": {
        "budgetStatus": {
          "totalBudget": 200000,
          "spentToDate": 100000,
          "budgetRemaining": 100000,
          "costVariance": -5000,
          "budgetAlert": "enabled"
        },
        "scheduleAdherence": {
          "projectStartDate": "2023-02-01",
          "plannedEndDate": "2023-11-30",
          "currentProgress": 75,
          "milestones": [
            {
              "name": "Research",
              "dueDate": "2023-04-01",
              "status": "Completed"
            },
            {
              "name": "Testing",
              "dueDate": "2023-09-15",
              "status": "Delayed"
            }
          ],
          "scheduleVariance": 3
        },
        "resourceUtilization": {
          "resourceAllocation": "Sam Brown, Emily Clark",
          "plannedResourceHours": 600,
          "actualResourceHours": 500,
          "utilizationPercentage": 83,
          "capacityAlert": "none"
        },
        "scopeControl": {
          "scopeDescription": "Redesign company website",
          "changeRequests": [
            {
              "description": "Add e-commerce module",
              "impact": "5 days, $5000",
              "approvalStatus": "Pending"
            }
          ],
          "scopeVariance": 5
        },
        "kpiThresholds": {
          "customKPITargets": {
            "budget": 85,
            "utilization": 80,
            "taskCompletion": 92
          },
          "kpiAlerts": {
            "budget": "enabled",
            "utilization": "enabled"
          }
        },
        "kpiTracking": {
          "kpiName": "Efficiency",
          "measurementPeriod": "Monthly",
          "owner": "Emily Clark",
          "currentValue": 80,
          "targetValue": 90,
          "trendIndicator": "down"
        }
      }
  
    }
  }
  