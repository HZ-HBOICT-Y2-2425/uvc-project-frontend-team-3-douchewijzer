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

        // const goals = await res.json();
        // if (goals) {
        //     console.log('Data received:', goals);
        //   } else {
        //     console.log('No data found.');
        //   }
        const goals = JSON.parse(text);

        //send fetched data to +page.svelte

        return {
            props: { goals, } };

    } catch (error) {
        console.error(error);
        return {
            goals: [],
        };
    }
};