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
        const id = parseInt(formData.get('userID'));
        let dataType = 1;
        let fullGoalDescription = '';
        let coinValue;

        if (goalDescription == "douche met timer") {
            fullGoalDescription = `Douche ${goalAmount} keer met de timer`
            coinValue = goalAmount * 50;
        } else {
            fullGoalDescription = `Bespaar ${goalAmount} liter water`
            dataType = 2;
            coinValue = goalAmount * 10;
        }
    
        try {
          const res = await fetch(`http://localhost:3010/goalsMilestones/goals?userID=${id}&goalDescription=${fullGoalDescription}&goalProgress=0&goalAmount=${goalAmount}&coinValue=${coinValue}&dataType=${dataType}`, {
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

            const resUsers = await fetch(`http://localhost:3010/users/${userID}`)
            const userText = await resUsers.text(); if (!userText) { throw new Error('Empty response body'); }
            const user = JSON.parse(userText);

            const userCoins = parseInt(user.coins);
            const newCoins = parseInt(coinValue);
    
            let coins = userCoins + newCoins;
        
            if (method !== 'DELETE') {
            return { success: false, error: 'Invalid request method' };

            }
            const deleteResponse = await fetch(`http://localhost:3010/goalsMilestones/goals/${goalID}`, {
                method: 'DELETE',
            });

            const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${coins}`, {
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
}