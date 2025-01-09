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
            let coinValue = formData.get('coinValue');
            const dataType = formData.get('dataType');
            let milestoneAmount = formData.get('milestoneAmount');
        
            if (method !== 'PUT') {
            return { success: false, error: 'Invalid request method' };

            }

            if (dataType == 1) {
                if (milestoneAmount < 100) {
                    milestoneAmount = milestoneAmount * 2;
                    coinValue = coinValue * 2;

                    const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${updatedCoins}`, {
                        method: 'PUT',
                    });

                    const UpdateResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestoneID}?coinValue=${coinValue}&milestoneAmount=${milestoneAmount}`, {
                        method: 'PUT'
                    })
                } else {
                    const deleteResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestoneID}`, {
                        method: 'DELETE',
                    });

                    const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${coinValue}`, {
                        method: 'PUT',
                    });
                }
            } else if (dataType == 2) {
                if (milestoneAmount < 10000) {
                    milestoneAmount = milestoneAmount * 2;
                    coinValue = coinValue * 2;

                    const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${coinValue}`, {
                        method: 'PUT',
                    });

                    const UpdateResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestoneID}?coinValue=${coinValue}&milestoneAmount=${milestoneAmount}`, {
                        method: 'PUT'
                    })
                } else {
                    const deleteResponse = await fetch(`http://localhost:3010/goalsMilestones/milestones/${milestoneID}`, {
                        method: 'DELETE',
                    });

                    const putResponse = await fetch(`http://localhost:3010/users/${userID}?coins=${coinValue}`, {
                        method: 'PUT',
                    });
                } 
            }
        } catch (error) {
            console.error(error);
            return {succes: false, error: error.message};
        }
      },
}