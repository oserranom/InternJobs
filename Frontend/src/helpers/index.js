
export function formatDate(isoDate){
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

export function truncate(text, maxLength){
    //Limita el número máximo de carácteres
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

//El navegador ya está validando (type="email")
export function isValidEmail(email){
    //Expresión regular mail válido: some@some.some
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPhone(number){
    //Validación de número de teléfono, solo números y mínimo 9.
    const phoneRegex = /^\d{9,}$/;
    return phoneRegex.test(number); 
}
