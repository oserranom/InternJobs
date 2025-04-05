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
    //Consulta para obtener las ofertas creadas por la empresa
    const { rows } = await pool.query(
        `SELECT 
        job_offers.id, 
        job_offers.title,
        job_offers.location, 
        job_offers.created_at, 
        companies.name AS company_name
        FROM job_offers 
        JOIN companies ON job_offers.company_id = companies.id 
        WHERE job_offers.company_id = $1`,
        [id]
    ); 
    return rows; 
}