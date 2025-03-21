import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) =>{

    let token = req.headers.authorization; 
    if(!token || !token.startsWith("Bearer ")) return res.status(401).json({ message: "Se requiere token de autorización válido" }); 

    //"Limpiar" el token para eliminar la parte de Bearer
    token = token.split(" ")[1]; 

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET); 
        req.id = id; 
        console.log(id); 
        next(); 
    } catch (error) {
        console.log(error); 
        return res.status(400).json({ message: "El token no es válido" }); 
    }
    
}

export default verifyToken; 