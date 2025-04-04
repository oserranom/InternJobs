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

