
const baseURL = import.meta.env.VITE_API_URL;


export async function applyToJobOffer(offerId, cover_letter){

    const token = localStorage.getItem('AUTH_TOKEN');
    if(!token) throw new Error('El candidato no está logeado');

    const url = `${baseURL}/jobs/${offerId}/apply`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                cover_letter: cover_letter || null
            })
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'No se pudo aplicar a esta oferta'); 
        }

        return data;

    } catch (error) {
        console.error(error);
        throw error; 
    }
}