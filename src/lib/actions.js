/** @type {import('./$types').PageLoad} */
export async function updateProgress(userID)  {
    try {

  if (!userID) {
    return json({ success: false, message: 'UserID is required' }, { status: 400 });
  }

  const res = await fetch(`http://localhost:3010/goalsMilestones/goals?userID=${userID}`)

  const goalText = await res.text(); if (!goalText) { throw new Error('Empty response body'); }

  const goals = JSON.parse(goalText);

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
          }
        }
    })
  )

  if (!res.ok) {
    throw new Error(`Failed to add goal: ${res.statusText}`);
  }
return { succes: true }  
} catch (error) {
    console.error(error);
    return {succes: false, error: error.message};
}
}