
const baseURL = import.meta.env.VITE_API_URL;


export async function registerCandidate({ name, email, phone_number, cv, password }){
    const url = `${baseURL}/candidates`; 

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone_number,
                cv,
                password
            })
        });

        const data = await response.json();
        console.log(data); 

        if(!response.ok){
            throw new Error(data.message || 'El candidato no ha podido ser registrado');
        }

        return data; 

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function registerCompany({ name, email, password, industry, description, company_url }){
    const url = `${baseURL}/companies`; 

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                industry,
                description,
                company_url
            })
        });

        const data = await response.json();
        console.log(data); 

        if(!response.ok){
            throw new Error(data.message || 'El candidato no ha podido ser registrado');
        }

        return data; 

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function loginCandidate({ email, password }){
    const url = `${baseURL}/candidates/login`; 

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No pudo realizarse el Login');
        }

        return data; 

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export async function loginCompany({ email, password }){
    const url = `${baseURL}/companies/login`; 

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No pudo realizarse el Login');
        }

        return data; 

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export async function getCandidate(){
    const url = `${baseURL}/candidates/profile`;
    const token = localStorage.getItem('AUTH_TOKEN'); 
    if (!token) throw new Error('Token de autenticación no encontrado');

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data); 

        if(!response.ok){
            throw new Error(data.message || 'No pudo realizarse el Login');
        }

        return data; 

    } catch (error) {
        console.log(error);
        throw error; 
    }
}

export async function getCompany(){
    const url = `${baseURL}/companies/profile`;
    const token = localStorage.getItem('AUTH_TOKEN'); 
    if (!token) throw new Error('Token de autenticación no encontrado');

    try {
        const response = await fetch(url, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json(); 

        if(!response.ok){
            throw new Error(data.message || 'No pudo realizarse el Login');
        }

        return data; 
        
    } catch (error) {
        console.log(error);
        throw error;
    }

}