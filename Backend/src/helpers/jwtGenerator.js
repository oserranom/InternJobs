import jwt from 'jsonwebtoken';

export const generateJWT = async (user) =>{
    const token = jwt.sign({id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return token; 
}