
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