
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