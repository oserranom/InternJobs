import { pool } from "../db.js";
import { isValidEmail } from "../helpers/validations.js";

export const createCompanie = async (req, res) =>{
    try {
        const { name, email, password, industry, description, company_url } = req.body;

        //Validación campos nulos y espacios vacíos
        if(!name?.trim() || !email?.trim() || !password?.trim()){
            return res.status(400).json({ message: "Los campos nombre, email y password son requeridos" }); 
        } 

        //Validación regex email
        if(!isValidEmail(email)) return res.status(400).json({ message: 'El email introducido no es válido' });

        //Validación password
        if (password.length < 6) return res.status(400).json({message: 'La contraseña debe de contener como mínimo 6 dígitos'});

        //Pasa validaciones, sentencia INSERT
        const { rows } = await pool.query(
            'INSERT INTO companies (name, email, password, industry, description, company_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*',
            [name, email, password, industry, description, company_url]
        );
        
        return res.json(rows[0]); 


    } catch (error) {
        console.log(error);
        //Separamos el error 23505 de postgres para devolver email ya registrado en la BBDD
        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
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
    const { id } = req.params;

    try {
        const { rows } = await pool.query("SELECT * FROM companies WHERE id = $1", [id]);
        if(rows.length === 0) return res.status(404).json({ message: "La empresa no existe" }); 
        res.json(rows[0]); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}


export const updateCompanie = async (req, res) =>{
    res.json({ message: 'Esto es una prueba' });
}

export const deleteCompanie = async (req, res) =>{
    const { id } = req.params;
    
    try {
        //Consulta candidato por id, usamos rowCount porque con DELETE row.length siempre devuelve 0
        const { rowCount } = await pool.query("DELETE FROM companies WHERE id = $1", [id]);
        if(rowCount === 0) return res.status(404).json({ message: "La empresa no existe" });
        return res.status(200).json({ message: "La empresa ha sido eliminada con éxito" }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}

export const createJobOffer = async (req, res) =>{
    res.json({ message: 'Hola mi gente' }); //Falta hacer 
}