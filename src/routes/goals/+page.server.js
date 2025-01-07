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
        console.log(goalDescription)
    
        try {
          const res = await fetch(`http://localhost:3010/goalsMilestones/goals?userID=30&goalDescription=${goalDescription}&goalAmount=${goalAmount}&coinValue=${coinValue}`, {
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
}