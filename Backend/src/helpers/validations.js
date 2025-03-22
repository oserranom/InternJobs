
export const isValidEmail = (email) => {
    //Expresión regular mail válido: some@some.some
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhone = (number) =>{
    //Validación de número de teléfono, solo números y mínimo 9.
    const phoneRegex = /^\d{9,}$/;
    return phoneRegex.test(number); 
}

