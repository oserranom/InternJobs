
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