
const baseURL = import.meta.env.VITE_API_URL;

export async function updateCompany ({ name, email, company_url, description }){

    const url = `${baseURL}/companies/profile`

    const token = localStorage.getItem('AUTH_TOKEN'); 

    if(!token) throw new Error('La sesión ha expirado, haz login de nuevo');  

    try {

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                company_url,
                description
            })
        });

        const data = await response.json();
        console.log(data); 

        if(!response.ok){
            throw new Error(data.message || 'No se pudo actualizar perfil'); 
        }

        return data; 

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export async function createJobOffer({ title, location, study_field, education_level, salary, description }){
    const url = `${baseURL}/companies/jobs`;
    const token = localStorage.getItem('AUTH_TOKEN'); 

    if(!token) throw new Error('La sesión ha expirado, haz login de nuevo'); 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                location,
                study_field,
                education_level,
                salary,
                description
            })
        });

        const data = await response.json();
        console.log(data);

        if(!response.ok){
            throw new Error(data.message || 'La oferta no ha podido publicarse');
        }

        return data; 
        
    } catch (error) {
        console.error(error);
        throw error; 
    }
}


export async function getJobOffersByCompany(){
    const url = `${baseURL}/companies/jobs`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }); 

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No se han podido obtener las ofertas publicadas'); 
        }

        return data; 

    } catch (error) {
        console.error(error);
        throw error; 
    }

}

export async function getApplicationsByCompany(){
    const url = `${baseURL}/companies/applications`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No se pudo obtener aplicaciones');
        }

        return data;

    } catch (error) {
        console.error(error);
        throw error; 
    }

}


export async function getApplicationById(id){
    const url = `${baseURL}/companies/applications/${id}`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No se ha podido obtener la aplicación');
        }

        return data;

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export async function updateStatus(id, status){
    const url = `${baseURL}/companies/applications/${id}`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status
            })
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No se ha podido actualizar el estado'); 
        }

        return data; 
        
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

export async function updateJobOffer(id, { title, location, study_field, education_level, salary, description }){
    const url = `${baseURL}/companies/jobs/${id}`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                location,
                study_field,
                education_level,
                salary,
                description
            })
        });

    } catch (error) {
        console.log(error);
        throw error; 
    }
}

export async function deleteJobOffer(id){

    const url = `${baseURL}/companies/jobs/${id}`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log(error);
        throw error; 
    }
}