import { pool } from "../db.js";
import { generateJWT } from "../helpers/jwtGenerator.js";
import { isValidEmail } from "../helpers/validations.js";
import { passHash, passMatch } from "../helpers/passwordhash.js";
import { 
    deleteCompanyModel,
    findCompanyByEmail, 
    findCompanyById, 
    findJobOffersByCompany, 
    insertNewCompany,
    insertNewJobOffer,
    updateCompanyModel, 
} from "../models/Company.js";

//PUBLIC
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

        //LLamada a model
        const company = await insertNewCompany(name, email, hashedPassword, industry, description, company_url);

        return res.status(201).json({
            message: "Empresa registrada con éxito",
            company: {
                name: company.name,
                email: company.email
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

        //llamada a model
        const company = await findCompanyByEmail(email);

        //Validar si la companie existe en la BBDD
        if(!company) return res.status(404).json({message: `La empresa con email: ${email} no existe`});

        //Validación de coincidencia de passwords
        const match = await passMatch(password, company.password); 
        if(!match) return res.status(401).json({ message: "Password incorrecto" }); 

        //Generar JWT para sesióncompany
        const token = await generateJWT({ id: company.id, email: company.email, role: "Company" });

        //Validaciones OK, Password coincide:
        res.status(200).json({
            message: "Login correcto",
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                token 
            }
        });
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Internal server error" }); 
    }  
}


//PRIVATE PROFILE
export const getCompany = async (req, res) =>{
    //Validación de rol
    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "}); 

    try {
        const company = await findCompanyById(req.id);
        if(!company) return res.status(404).json({ message: "La empresa no existe" }); 

        return res.status(200).json({
            message: "Empresa identificada",
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                industry: company.industry,
                description: company.description,
                company_url: company.company_url
            }
        }); 

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}


export const updateCompany = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});

    const { name, email, description, company_url } = req.body;

    try {
        //Validaciones
        if(!name?.trim() || !email?.trim() || !description?.trim() || !company_url?.trim){
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        } 

        if(!isValidEmail(email)) return res.status(400).json({ message: "El email introducido no es válido" }); 

        //LLamda a model
        const company = await updateCompanyModel(name, email, description, company_url, req.id);
        if(!company) return res.status(404).json({ message: "La empresa no existe" });
        
        //Respuesta
        return res.json({
            message: "Los datos han sido actualizados",
            companie: {
                name: company.name,
                email: company.email,
                description: company.description,
                company_url: company.company_url
            }
        });

    } catch (error) {
        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}


export const deleteCompany = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});
    
    try {
        const result = await deleteCompanyModel(req.id);
        if(result === 0) return res.status(404).json({ message: "La empresa no existe" });
        return res.status(200).json({ message: "La empresa ha sido eliminada con éxito" }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}


//PRIVATE JOB OFFERS MANAGEMENT
export const createJobOffer = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    const { title, description, location, salary, education_level, study_field } = req.body; 

    try {
        //Validación
        if(!title?.trim() || !description?.trim()) return res.status(400).json({ message: "Los campos title y description son requeridos" });
        if(!salary || isNaN(salary) || salary < 0) return res.status(400).json({ message: "Introduce un sueldo númerico y positivo" }); 
        
        //Validación OK e ID válido, llamada a model:
        const jobOffer = await insertNewJobOffer(req.id, title, description, location, salary, education_level, study_field);

        //Respuestas
        return res.status(201).json({
            message: "La oferta ha sido creada con éxito",
            jobOffer
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}


export const getJobOffersByCompany = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    try {
        //Lamada al model
        const jobOffers = await findJobOffersByCompany(req.id);
        if(jobOffers.length === 0) return res.status(404).json({ message: "Esta empresa aún no ha publicado ofertas" }); 
        return res.json(jobOffers); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getJobOfferByIdCom = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    //Extrae id de la url
    const { id } = req.params;

    try {
        //Verificación de coincidencia oferta pertenece a empresa logueada
        const { rows } = await pool.query(
            "SELECT * FROM job_offers WHERE id = $1 AND company_id = $2",
            [id, req.id]
        );

        if(rows.length === 0) return res.status(404).json({ message: "Oferta no encontrada" }); 

        return res.json(rows[0]);

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Interna server error" }); 
    }
}


export const updateJobOffer = async (req, res) =>{
    
    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    const { id } = req.params;
    const { title, description, location, salary, education_level, study_field } = req.body;

    try {
        const { rowCount } = await pool.query(
            "SELECT * FROM job_offers WHERE id = $1 AND company_id = $2",
            [id, req.id]
        );

        if (rowCount === 0) return res.status(404).json({ message: "Oferta no encontrada" }); 

        //La oferta pertenece a la empresa logueada pasamos a validaciones
        if(!title?.trim() || !description?.trim()) return res.status(400).json({ message: "Los campos title y description son requeridos" });
        if(!salary || isNaN(salary) || salary < 0) return res.status(400).json({ message: "Introduce un sueldo númerico y positivo" }); 

        //La oferta pertenece a la empresa logueada y los datos de esta pasan todas las validaciones: consulta update
        const { rows } = await pool.query(
            `UPDATE job_offers SET title = $1, description = $2, location = $3, salary = $4, education_level = $5, study_field = $6
            WHERE id = $7 RETURNING *`,
            [title, description, location, salary, education_level, study_field, id]
        ); 

        return res.json({
            message: "Oferta actualizada con éxito",
            job_offer: rows[0]
        }); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}


export const deleteJobOffer = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    const { id } = req.params;

    try {

        const { rowCount } = await pool.query(
            "SELECT id FROM job_offers WHERE id = $1 AND company_id = $2",
            [id, req.id]
        );

        if(rowCount === 0) return res.status(404).json({ message: "Oferta no encontrada" }); 

        //Si la oferta pertenece a la empresa sentencia delete
        await pool.query("DELETE FROM job_offers WHERE id = $1", [id]);
        return res.status(200).json({ message: "Oferta eliminada con éxito" }); 
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}


//PRIVATE APPLICATIONS MANAGEMENT
export const getApplicationsByCompany = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    try {
        //Consulta para traer el resumen de la aplicación, se requiere obtener datos de las tablas
        //job_offers y candidates a partir de la tabla applications, por eso tiene 2 JOIN. 
        const { rows } = await pool.query(
            `SELECT 
                job_offers.title, 
                candidates.name, 
                candidates.email, 
                applications.applied_at,
                applications.status
                FROM applications
                JOIN job_offers ON applications.job_offer_id = job_offers.id
                JOIN candidates ON applications.candidate_id = candidates.id
                WHERE job_offers.company_id = $1
                ORDER BY applications.applied_at DESC`,
            [req.id]
        );

        if(rows.length === 0) return res.status(404).json({ message: "No se han encontrado aplicaciones" }); 

        return res.status(200).json(rows); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}

export const getApplicationById = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esa acción" });

    try {
        //Verificación IDs, la job_offer pertenece a la company
        const ComIdByJwt = req.id; 
        const { id: appId } = req.params;

        const { rows: consultaId } = await pool.query(
            `SELECT job_offers.company_id 
            FROM applications 
            JOIN job_offers ON applications.job_offer_id = job_offers.id 
            WHERE applications.id = $1`,
            [appId]
        );

        if(consultaId.length === 0) return res.status(404).json({ message: "No se han encontrado aplicaciones con esta id" });

        const ComIdByUrl = consultaId[0].company_id;

        if(ComIdByUrl !== ComIdByJwt) return res.status(403).json({ message: "Esta oferta no pertenece a la empresa logueada" }); 

        //Consulta para obtener detalle de la aplicación:
        const { rows: applicationDetails } = await pool.query(
            `SELECT 
            candidates.name, candidates.cv, candidates.email, candidates.phone_number,
            applications.cover_letter, applications.status,
            job_offers.title
            FROM applications
            JOIN candidates ON applications.candidate_id = candidates.id
            JOIN job_offers ON applications.job_offer_id = job_offers.id
            WHERE applications.id = $1`,
            [appId]
        );

        return res.status(200).json(applicationDetails[0]); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }

}

export const updateApplication = async (req, res) =>{

    if(req.role !== "Company") return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });

    try {
        const { status } = req.body;

        //Verificación id == company_id
        const ComIdByJwt = req.id; 
        const { id: appId } = req.params;

        const { rows: consultaId } = await pool.query(
            `SELECT job_offers.company_id 
            FROM applications 
            JOIN job_offers ON applications.job_offer_id = job_offers.id 
            WHERE applications.id = $1`,
            [appId]
        );

        if(consultaId.length === 0) return res.status(404).json({ message: "No se han encontrado aplicaciones con esta id" });

        const ComIdByUrl = consultaId[0].company_id;
        if(ComIdByUrl !== ComIdByJwt) return res.status(403).json({ message: "Esta oferta no pertenece a la empresa logueada" }); 
        
        //Status válido:
        const validStatuses = ["applied", "interview", "rejected", "hired"];
        if(!validStatuses.includes(status)) return res.status(400).json({ message: "Estado inválido" });

        //Actualizar status:
        await pool.query("UPDATE applications SET status = $1 WHERE id = $2", [status, appId]);
        return res.status(200).json({ message: `El estado de la aplicación ha sido actualizado a: ${status}` });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}