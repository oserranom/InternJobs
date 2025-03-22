import jwt from 'jsonwebtoken';

export const generateJWT = async ({ id, email, role }) =>{
    const token = jwt.sign({ id, email, role },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
    console.log(jwt.decode(token)); 
    return token; 
}