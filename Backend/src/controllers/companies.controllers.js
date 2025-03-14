import { pool } from "../db.js";

export const createCompanie = async (req, res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error"});
    }
}

export const loginCompanie = async (req, res) =>{
    try {
        const { email, password } = req.body;
        //Validación de campos
        if(!email?.trim() || !password?.trim()) return res.status(400).json({ message: "Email y password son campos requeridos"});

        //Sentencia buscar coincidencia por email
        const { rows } = await pool.query("SELECT * FROM companies WHERE email = $1", [email]);
        //Validar si la companie existe en la BBDD
        if(rows.length === 0) return res.status(404).json({message: `La empresa con email: ${email} no existe`});

        //Validación de coincidencia de passwords
        const companie = rows[0];
        if(companie.password !== password) return res.status(401).json({ message: `Password incorrecto`}); 

        //Validaciones OK, Password coincide:
        res.status(200).json({
            message: "Login correcto",
            companie: {
                id: companie.id,
                name: companie.name,
                email: companie.email 
            }
        });
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Internal server error" }); 
    }  
}

export const getCompanie = async (req, res) =>{
    res.json({message: 'Esto es una prueba'});
}


export const updateCompanie = async (req, res) =>{
    res.json({message: 'Esto es una prueba'});
}

export const deleteCompanie = async (req, res) =>{
    res.json({message: 'Esto es una prueba'});
}

export const createJobOffer = async (req, res) =>{
    res.json({ message: 'Hola mi gente' }); //Falta hacer 
}