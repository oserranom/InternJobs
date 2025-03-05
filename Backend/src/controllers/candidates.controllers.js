import { pool } from "../db.js";


export const loginCandidate = async (req, res) =>{
    try {

        const { email, password } = req.body;

        //Validación de email y password no sean null
        if(!email || !password) return res.status(400).json({ error: 'Email y contraseña son requeridos'});

        //Buscar coincidencia candidato por email
        const { rows } = await pool.query("SELECT * FROM candidates WHERE email = $1", [email]); 

        //res 404 en caso de no encontrar candidate
        if(rows.length === 0) return res.status(404).json({ error: `El usuario con email: ${email} no existe`}); 

        //Comprobar contraseña, sin HASH por ahora
        const candidate = rows[0]; 
        if (candidate.password !== password) return res.status(401).json({error: 'Password incorrecto'});

        //Pasa validación y password coincide
        res.status(200).json({
            message: 'Login succes',
            candidate:{
                id: candidate.id,
                name: candidate.name,
                email: candidate.email,
            }
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error'}); 
    }
}



export const getCandidate = async (req, res) =>{
    const { id } = req.params;

    try {
        //Consulta por id 
        const { rows } = await pool.query("SELECT * FROM candidates WHERE id = $1", [id]);
        if(rows.length === 0) return res.status(404).json({message: `El usuario con id: ${id} no existe`}); 
        res.json(rows[0]); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `El patrón de la id: ${id} no cumple con el estándar de sintáxis`}); 
    }

}


export const createCandidate = async (req, res) =>{
    
    try {
        const { name, email, password, cv, phone_number } = req.body;

        //Validación de campos nulos
        if (!name || !email || !password || !phone_number) {
            return res.status(400).json({ message: 'Nombre, email, contraseña y tlf son requeridos' });
        }

        //Validación de email válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'El email no tiene un formato válido' });
        }

        //validación de contraseña de como mínimo 6 dígitos
        if (password.length < 6) return res.status(400).json({message: 'La contraseña debe de contener como mínimo 6 dígitos'});

        //Validación de número de teléfono, solo números y mínimo 9.
        const phoneRegex = /^\d{9,}$/;
        if (!phoneRegex.test(phone_number)) {
            return res.status(400).json({ message: 'El número de teléfono debe contener al menos 9 dígitos' });
        }

        const {rows} = await pool.query(
                        "INSERT INTO candidates (name, email, password, cv, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING*",
                        [name, email, password, cv || null, phone_number]);
        return res.json(rows[0]); 
        
    } catch (error) {
        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        return res.status(500).json({message: 'Internal server error'}); 
    }
}

export const updateCandidate = async (req, res) =>{
   // res.json({message: 'Esto es una prueba'});
}

export const deleteCandidate = async (req, res) =>{
    //res.json({message: 'Esto es una prueba'});
}