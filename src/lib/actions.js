/** @type {import('./$types').PageLoad} */
import averageWaterUsage from '$lib/StatisticsData.svelte';

export async function updateProgress(userID, liters = null)  {
    try {

  if (!userID) {
    return json({ success: false, message: 'UserID is required' }, { status: 400 });
  }

  const res = await fetch(`http://localhost:3010/goalsMilestones/goals?userID=${userID}`)
  const goalText = await res.text(); if (!goalText) { throw new Error('Empty response body'); }
  const goals = JSON.parse(goalText);

  const resMilestones =  await fetch(`http://localhost:3010/goalsMilestones/milestones?userID=${userID}`)
  const milestoneText = await resMilestones.text(); if (!milestoneText) { throw new Error('Empty response body'); }
  const milestones = JSON.parse(milestoneText);

  const updatedGoals = await Promise.all(
    goals.map(async (goal) => {
      if (goal.userID == userID)  {
        if (goal.dataType == 1) {
            if(goal.goalProgress < goal.goalAmount) {
        let updatedProgress = goal.goalProgress;

        updatedProgress += 1;

        const putResponse = await fetch(`http://localhost:3010/goalsMilestones/goals/${goal.goalID}?goalProgress=${updatedProgress}`, {
            method: 'PUT',
            }); 
           }
          } else if (goal.dataType == 2) {
            if (goal.goalProgress < goal.goalAmount) {
                let updatedProgress = goal.goalProgress;
                let savedWater = averageWaterUsage - liters;

                if (savedWater > 0) {
                    updatedProgress = updatedProgress += savedWater;
                }

                if (updatedProgress > goal.goalAmount) {
                    updatedProgress = goal.goalAmount;
                }

                const putResponse = await fetch(`http://localhost:3010/goalsMilestones/goals/${goal.goalID}?goalProgress=${updatedProgress}`, {
                    method: 'PUT',
                }); 
            }
          }
        }
    })
  )

  const updatedMilestones = await Promise.all(
    milestones.map(async (milestone) => {
      if (milestone.userID == userID)  {
        if (milestone.dataType == 1) {
            if (milestone.milestoneProgress < milestone.milestoneAmount) {
        let updatedProgress = milestone.milestoneProgress;
           updatedProgress += 1;

        const putResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestone.milestoneID}?milestoneProgress=${updatedProgress}`, {
            method: 'PUT',
            
            }); 
        }
          } else if (milestone.dataType == 2) {
            if (milestone.milestoneProgress < milestone.milestoneAmount) {
                let updatedProgress = milestone.milestoneProgress;
                let savedWater = averageWaterUsage - liters;

                if (savedWater > 0) {
                    updatedProgress = updatedProgress += savedWater;
                }

                const putResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestone.milestoneID}?milestoneProgress=${updatedProgress}`, {
                    method: 'PUT',
                }); 
            }
        }
        }
    })
  )

  if (!res.ok) {
    throw new Error(`Failed to add goal: ${res.statusText}`);
  }
return { succes: true }  
} catch (error) {
    return {succes: false, error: error.message};
}
}