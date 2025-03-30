import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) =>{

    let token = req.headers.authorization; 
    if(!token || !token.startsWith("Bearer ")) return res.status(401).json({ message: "Se requiere token de autorización válido" }); 

    //"Limpiar" el token para eliminar la parte de "Bearer "
    token = token.split(" ")[1]; 

    try {
        const { id, role } = jwt.verify(token, process.env.JWT_SECRET); 
        req.id = id; 
        req.role = role; 
        next(); 
    } catch (error) {
        if(error.name === "TokenExpiredError") return res.status(401).json({ message: "Sesión expirada" }); 
        console.log(error); 
        return res.status(403).json({ message: "El token no es válido" }); 
    }
    
}

export default verifyToken; 