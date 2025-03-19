import { pool } from "../db.js";
import { isValidEmail, isValidPhone } from "../helpers/validations.js";
import { passHash, passMatch } from "../helpers/passwordhash.js";
import { generateJWT } from "../helpers/jwtGenerator.js";



export const loginCandidate = async (req, res) =>{
    try {

        const { email, password } = req.body;

        //Validación de email y password no sean null o espacios vacíos 
        if(!email?.trim() || !password?.trim()) return res.status(400).json({ error: 'Email y contraseña son requeridos'});

        //Buscar coincidencia candidato por email
        const { rows } = await pool.query("SELECT * FROM candidates WHERE email = $1", [email]); 

        //res 404 en caso de no encontrar candidate
        if(rows.length === 0) return res.status(404).json({ error: `El candidato con email '${email}' no existe`}); 

        //Comprobar contraseña
        const candidate = rows[0]; 
        const match = await passMatch(password, candidate.password); 
        if (!match) return res.status(401).json({ error: 'Password incorrecto' });

        //Generar JWT para sesión
        const token = await generateJWT(candidate.id, candidate.email); 

        //Pasa validación y password coincide
        res.status(200).json({
            message: 'Login correcto',
            candidate:{
                id: candidate.id,
                name: candidate.name,
                email: candidate.email,
                token
            }
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error'}); 
    }
}



export const getCandidate = async (req, res) =>{

    try {
        //Consulta por id, si no devuelve 1 row el candidato no existe 
        const { rows } = await pool.query("SELECT * FROM candidates WHERE id = $1", [req.id]);
        if(rows.length === 0) return res.status(404).json({ message: "El candidato no existe" }); 
        res.json(rows[0]); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" }); 
    }

}


export const createCandidate = async (req, res) =>{
    
    try {
        const { name, email, password, cv, phone_number } = req.body;

        //Validación de campos nulos o espacios vacíos 
        if (!name?.trim() || !email || !password || !phone_number) {
            return res.status(400).json({ message: 'Nombre, email, contraseña y tlf son requeridos' });
        }

        //Validación de email según expresión regular.
        if (!isValidEmail(email)) return res.status(400).json({ message: 'El email introducido no es válido' }); 

        //validación de contraseña de como mínimo 6 dígitos
        if (password.length < 6) return res.status(400).json({message: 'La contraseña debe de contener como mínimo 6 dígitos'});

        //Validación de número según expresión regular.
        if (!isValidPhone(phone_number)) return res.status(400).json({ message: 'Introduce un número válido' }); 

        //Ha pasado las validaciones: 
        //Hash de password
        const hashedPassword = await passHash(password); 

        //Consulta insert
        const {rows} = await pool.query(
            "INSERT INTO candidates (name, email, password, cv, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING name, email",
            [name, email, hashedPassword, cv || null, phone_number]
        );
        return res.status(201).json({
            message: "Candidato registrado",
            candidate: {
                name: rows[0].name,
                email: rows[0].email
            }
        }); 
        
    } catch (error) {
        console.log(error); 
        //Separamos el error 23505 de postgres para devolver email ya registrado en la BBDD
        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        return res.status(500).json({message: 'Internal server error'}); 
    }
}

export const updateCandidate = async (req, res) =>{
   const { id } = req.params;
   const { name, email, phone_number, cv } = req.body;

    try {
        //Validaciones
        if(!name?.trim() || !email?.trim() || !phone_number?.trim()) return res.status(400).json({ message: "Los campos nombre, email y tlf son requeridos" });
        if(!isValidEmail(email)) return res.status(400).json({ message: "El email introducido no es válido" });
        if(!isValidPhone(phone_number)) return res.status(400).json({ message: "El tlf introducido no es válido" });

        //Consulta update de los 4 parámetros susceptibles de cambio pasando el id como referencia
        const { rows } = await pool.query(
            "UPDATE candidates SET name = $1, email = $2, phone_number = $3, cv = $4 WHERE id = $5 RETURNING *",
            [name, email, phone_number, cv, id]
        );

        if(rows.length === 0) return res.status(404).json({ message: "El candidato no existe" }); 

        return res.json({ 
            message: "Los datos han sido actualizados",
            candidate: {
                name: rows[0].name,
                email: rows[0].email,
                phone_number: rows[0].phone_number,
                cv: rows[0].cv,
            }
        }); 

    } catch (error) {

        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' }); 
    }
}

export const deleteCandidate = async (req, res) =>{
    const { id } = req.params;

    try {
        //Consulta candidato por id, usamos rowCount porque con DELETE row.length siempre devuelve 0
        const { rowCount } = await pool.query('DELETE FROM candidates WHERE id = $1', [id]);

        if(rowCount === 0) return res.status(404).json({ message: 'EL candidato no existe'});

        return res.status(200).json({ message: 'Candidato eliminado'}); 

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error'}); 
    }

}