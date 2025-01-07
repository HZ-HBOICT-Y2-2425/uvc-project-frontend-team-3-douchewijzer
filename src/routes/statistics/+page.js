// /** @type {import('./$types').PageLoad} */
// export async function load( { fetch} ) { 
//     try {
//         //fetch data from the backend
//         const res = await fetch("http://localhost:3010/statistics/33", { 
//             mode: 'no-cors'
//         });
//         if (!res.ok) {
//             throw new Error(`Failed to fetch goals: ${res.statusText}`);
//         }
//         const text = await res.text(); if (!text) { throw new Error('Empty response body'); }


//         const statistics = JSON.parse(text);

//         //send fetched data to +page.svelte

//         return {
//             props: { statistics, } };

//     } catch (error) {
//         console.error(error);
//         return {
//             statistics: [],
//         };
//     }
// };
