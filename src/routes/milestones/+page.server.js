/** @type {import('./$types').PageLoad} */
export async function load( { fetch} ) { 
    try {
        //fetch data from the backend
        const res = await fetch("http://localhost:3010/goalsMilestones/milestones", { 
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

      claimMilestone: async ({request}) => {

        try {
            const formData = await request.formData();
            const method = formData.get('_method');
            const milestoneID = formData.get('milestoneID');
            const userID = formData.get('userID');
            const coinValue = formData.get('coinValue');
        
            if (method !== 'PUT') {
            return { success: false, error: 'Invalid request method' };

            }

            const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${coinValue}`, {
                method: 'PUT',
            });

            const UpdateResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestoneID}?coinValue=600&milestoneAmount=60`, {
                method: 'PUT'
            })

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