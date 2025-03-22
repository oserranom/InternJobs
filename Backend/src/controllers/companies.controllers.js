import { pool } from "../db.js";
import { generateJWT } from "../helpers/jwtGenerator.js";
import { isValidEmail, isValidSalary } from "../helpers/validations.js";
import { passHash, passMatch } from "../helpers/passwordhash.js";


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

        //Pasa validaciones
        //Hash de password
        const hashedPassword = await passHash(password); 

        //Consulta insert
        const { rows } = await pool.query(
            'INSERT INTO companies (name, email, password, industry, description, company_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, email',
            [name, email, hashedPassword, industry, description, company_url]
        );
        
        return res.status(201).json({
            message: "Empresa registrada con éxito",
            companie: {
                name: rows[0].name,
                email: rows[0].email
            }
        }); 


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
        const match = await passMatch(password, companie.password); 
        if(!match) return res.status(401).json({ message: "Password incorrecto" }); 

        //Generar JWT para sesión
        const token = await generateJWT({ id: companie.id, email: companie.email });

        //Validaciones OK, Password coincide:
        res.status(200).json({
            message: "Login correcto",
            companie: {
                id: companie.id,
                name: companie.name,
                email: companie.email,
                token 
            }
        });
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Internal server error" }); 
    }  
}

export const getCompanie = async (req, res) =>{

    try {
        const { rows } = await pool.query("SELECT * FROM companies WHERE id = $1", [req.id]);
        if(rows.length === 0) return res.status(404).json({ message: "La empresa no existe" }); 
        res.json(rows[0]); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}


export const updateCompanie = async (req, res) =>{
    const { id } = req.params;
    const { name, email, description, company_url } = req.body;

    try {
        //Validaciones
        if(!name?.trim() || !email?.trim()) return res.status(400).json({ message: "Los campos de nombre y email son requeridos" });
        if(!isValidEmail(email)) return res.status(400).json({ message: "El email introducido no es válido" }); 

        //Validación OK, consulta update.
        const { rows } = await pool.query(
            "UPDATE companies SET name = $1, email = $2, description = $3, company_url = $4 WHERE id = $5 RETURNING*",
            [name, email, description, company_url, id]
        );

        if(rows.length === 0) return res.status(404).json({ message: "La empresa no existe" });
        
        //Respuesta
        return res.json({
            message: "Los datos han sido actualizados",
            companie: {
                name: rows[0].name,
                email: rows[0].email,
                description: rows[0].description,
                company_url: rows[0].company_url
            }
        });

    } catch (error) {
        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
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
    const { id } = req.params;
    const { title, description, location, salary, education_level, study_field } = req.body; 

    try {
        //Validación
        if(!title?.trim() || !description?.trim()) return res.status(400).json({ message: "Los campos title y description son requeridos" });
        if(isValidSalary(salary)) return res.status(400).json({ message: "Introduce un sueldo númerico y positivo" }); 

        //Consulta para validar si la empresa existe en la BBDD
        const companyResult = await pool.query("SELECT id FROM companies WHERE id = $1", [id]);
        if(companyResult.rows.length === 0) return res.status(404).json({ message: "La empresa no existe" }); 
        
        //Validación OK e ID válido
        const { rows } = await pool.query(
            "INSERT INTO job_offers (company_id, title, description, location, salary, education_level, study_field) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [id, title, description, location, salary, education_level, study_field]
        );
        
        //Respuestas
        return res.status(201).json({
            message: "La oferta ha sido creada con éxito",
            job_offer: rows[0]
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}

export const getJobOffersByCompany = async (req, res) =>{
    const { id } = req.params;

    try {
       const { rows } = await pool.query(
        "SELECT job_offers.*, companies.name AS company_name FROM job_offers JOIN companies ON job_offers.company_id = companies.id WHERE job_offers.company_id = $1",
        [id]
       ); 

        if(rows.length === 0) return res.status(404).json({ message: "Esta empresa aún no ha publicado ofertas" }); 

        return res.json(rows); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}