
const baseURL = import.meta.env.VITE_API_URL;

export async function getApplicationsByCandidate(){
    const url = `${baseURL}/candidates/applications`;
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
            throw new Error(data.message || 'No se han podido obtener candidaturas');
        }
    
        return data; 

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function updateCandidate({ name, email, phone_number, cv }){
    const url = `${baseURL}/candidates/profile`;
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone_number,
                cv
            })
        });
    
        const data = await response.json();
    
        if(!response.ok){
            throw new Error(data.message || 'No se han podido actualizar datos');
        }
    
        return data;

    } catch (error) {
        console.error(error);
        throw error; 
    }

}