
const baseURL = import.meta.env.VITE_API_URL;

export async function searchJobs({location, study_field, education_level}){

    const url = `${baseURL}/jobs/search?location=${location}&study_field=${study_field}&education_level=${education_level}`;

    try {
        const response = await fetch(url);

        if(!response.ok){
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || response.statusText); 
        }

        const jobOffers = await response.json();
        console.log(jobOffers);
        return jobOffers; 

    } catch (error) {
        console.log(error); 
    }
}

export async function getJobOffer(id){
    const url = `${baseURL}/jobs/${id}`;

    try {
        const response = await fetch(url);

        if(!response.ok){
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || response.statusText); 
        }

        const jobOffer = await response.json();
        console.log(jobOffer);
        return jobOffer; 

    } catch (error) {
        console.log(error); 
    }
}