import { pool } from "../db.js";

export const insertNewCompany = async (name, email, hashedPassword, industry, description, company_url) =>{
    //Consulta insert nueva company
    const { rows } = await pool.query(
        'INSERT INTO companies (name, email, password, industry, description, company_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, email',
        [name, email, hashedPassword, industry, description, company_url]
    );

    return rows[0]; 
}

export const findCompanyByEmail = async (email) =>{
    const { rows } = await pool.query("SELECT * FROM companies WHERE email = $1", [email]);
    return rows[0]; 
}


export const findCompanyById = async (id) =>{
    const { rows } = await pool.query("SELECT * FROM companies WHERE id = $1", [id]);
    return rows[0]; 
}

export const updateCompanyModel = async (name, email, description, company_url, id)=>{
    //Consulta update
    const { rows } = await pool.query(
        "UPDATE companies SET name = $1, email = $2, description = $3, company_url = $4 WHERE id = $5 RETURNING*",
        [name, email, description, company_url, id]
    );
    return rows[0]; 
}

export const deleteCompanyModel = async (id)=>{
    //Consulta empresa por id, usamos rowCount porque con DELETE row.length siempre devuelve 0
    const { rowCount } = await pool.query("DELETE FROM companies WHERE id = $1", [id]);
    return rowCount; 
}

export const insertNewJobOffer = async (id, title, description, location, salary, education_level, study_field) =>{
    //Consulta insert a job_offers
    const { rows } = await pool.query(
        `INSERT INTO job_offers (company_id, title, description, location, salary, education_level, study_field) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING title, description, location, salary, education_level, study_field`,
        [id, title, description, location, salary, education_level, study_field]
    );
    return rows[0];
}

export const findJobOffersByCompany = async (id)=>{
    //Consulta para obtener las ofertas creadas por la empresa a partir de su id
    //Además se realiza un conteo al vuelo de las aplicaciones recibidas en cada job_offer y se agrupan
    const { rows } = await pool.query(
        `SELECT 
            job_offers.id, 
            job_offers.title,
            job_offers.description,
            job_offers.location, 
            job_offers.study_field,
            job_offers.education_level,
            job_offers.created_at, 
            companies.name AS company_name,
            COUNT (applications.id) AS application_count
        FROM job_offers 
        JOIN companies ON job_offers.company_id = companies.id 
        LEFT JOIN applications ON job_offers.id = applications.job_offer_id
        WHERE job_offers.company_id = $1
        GROUP BY 
            job_offers.id,
            job_offers.title,
            job_offers.description,
            job_offers.location,
            job_offers.study_field,
            job_offers.education_level,
            job_offers.created_at,
            companies.name`,
        [id]
    ); 
    return rows; 
}

export const findJobOfferByIdCom = async (jobOffer_id, company_id)=>{
    //Obtención de job_offer by id con match a company_id
    const { rows } = await pool.query(
        "SELECT * FROM job_offers WHERE id = $1 AND company_id = $2",
        [jobOffer_id, company_id]
    );
    return rows[0]; 
}

export const updateJobOfferModel = async(title, description, location, salary, education_level, study_field, id)=>{
    //Consulta update job_offer
    const { rows } = await pool.query(
        `UPDATE job_offers SET title = $1, description = $2, location = $3, salary = $4, education_level = $5, study_field = $6
        WHERE id = $7 RETURNING *`,
        [title, description, location, salary, education_level, study_field, id]
    ); 
    return rows[0]; 
}

export const deleteJobOfferModel = async(id)=>{
    await pool.query("DELETE FROM job_offers WHERE id = $1", [id]);
}

export const findApplicationsByCompany = async (id) =>{
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
        [id]
    );

    return rows; 
}


export const ApplicationCompanyMatch = async (id)=>{
    //consulta verificación id == company_id
    const { rows } = await pool.query(
        `SELECT job_offers.company_id 
        FROM applications 
        JOIN job_offers ON applications.job_offer_id = job_offers.id 
        WHERE applications.id = $1`,
        [id]
    );
    return rows[0]; 
}

export const findApplicationById = async (id)=>{
    //Consulta para obtener detalle de la aplicación:
    const { rows } = await pool.query(
        `SELECT 
        candidates.name, candidates.cv, candidates.email, candidates.phone_number,
        applications.cover_letter, applications.status,
        job_offers.title
        FROM applications
        JOIN candidates ON applications.candidate_id = candidates.id
        JOIN job_offers ON applications.job_offer_id = job_offers.id
        WHERE applications.id = $1`,
        [id]
    );
    return rows[0];
}

export const updateApplicationStatus = async (status, id) =>{
    await pool.query("UPDATE applications SET status = $1 WHERE id = $2", [status, id]);
    return status; 
}