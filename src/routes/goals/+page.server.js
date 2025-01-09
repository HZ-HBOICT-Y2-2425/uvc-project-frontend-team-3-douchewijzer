/** @type {import('./$types').PageLoad} */
export async function load( { fetch} ) { 
    try {
        //fetch data from the backend
        const res = await fetch("http://localhost:3010/goalsMilestones/goals", { 
            mode: 'no-cors'
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch goals: ${res.statusText}`);
        }
        const text = await res.text(); if (!text) { throw new Error('Empty response body'); }

        const data = JSON.parse(text);

        //send fetched data to +page.svelte
        return {
            props: { data, } };

    } catch (error) {
        console.error(error);
        return {
            data: [],
        };
    }
};

export const actions = {

    addGoal: async ({ request }) => {
        const formData = await request.formData();
        const goalDescription = formData.get('goalDescription');
        const goalAmount = parseInt(formData.get('goalAmount'));
        const coinValue = parseInt(formData.get('coinValue'));
        const id = parseInt(formData.get('userID'));
        console.log(goalDescription)
    
        try {
          const res = await fetch(`http://localhost:3010/goalsMilestones/goals?userID=${id}&goalDescription=${goalDescription}&goalProgress=0&goalAmount=${goalAmount}&coinValue=${coinValue}`, {
            method: 'POST',
          });
    
          if (!res.ok) {
            throw new Error(`Failed to add goal: ${res.statusText}`);
          }
    
          return { success: true };
        } catch (error) {
          console.error(error);
          return { success: false, error: error.message };
        }
      },
    
      claimGoal: async ({request}) => {

        try {
            const formData = await request.formData();
            const method = formData.get('_method');
            const goalID = formData.get('goalID');
            const userID = formData.get('userID');
            const coinValue = formData.get('coinValue');
        
            if (method !== 'DELETE') {
            return { success: false, error: 'Invalid request method' };

            }
            const deleteResponse = await fetch(`http://localhost:3010/goalsMilestones/goals/${goalID}`, {
                method: 'DELETE',
            });

            const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${coinValue}`, {
                method: 'PUT',
            });

            if (!res.ok) {
                throw new Error(`Failed to add goal: ${res.statusText}`);
              }
            return { succes: true }  
        } catch (error) {
            console.error(error);
            return {succes: false, error: error.message};
        }
      },

      updateProgress: async ({request}) => {
        try {
      const formData = await request.formData();
      const userID = formData.get('userID');

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
            let updatedProgress = goal.goalProgress;

            updatedProgress += 1;

            console.log(updatedProgress);

            console.log(userID)

            const putResponse = await fetch(`http://localhost:3010/goalsMilestones/goals/${goal.goalID}?goalProgress=${updatedProgress}`, {
                method: 'PUT',
                }); 
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
}