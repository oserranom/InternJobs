import jwt from 'jsonwebtoken';

export const generateJWT = async (email) =>{
    const token = jwt.sign({email},
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return token; 
}