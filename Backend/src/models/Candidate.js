import { pool } from "../db.js";

export const findCandidateByEmail = async (email) =>{
    //Consulta busca candidate coincidente con email
    const { rows } = await pool.query("SELECT * FROM candidates WHERE email = $1", [email]);
    return rows[0]; 
}

export const insertNewCandidate = async (name, email, hashedPassword, cv, phone_number) =>{
    //Consulta insert nuevo candidato
    const {rows} = await pool.query(
        "INSERT INTO candidates (name, email, password, cv, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING name, email",
        [name, email, hashedPassword, cv || null, phone_number]
    );
    return rows[0];
}

export const findCandidateById = async (id) =>{
    //Consulta busca candidate por id
    const { rows } = await pool.query("SELECT id, name, email, phone_number, cv FROM candidates WHERE id = $1", [id]);
    return rows[0];
}

export const updateCandidateModel = async (name, email, phone_number, cv, id) =>{
    //Consulta update de los 4 parámetros susceptibles de cambio pasando el id como referencia
    const { rows } = await pool.query(
        "UPDATE candidates SET name = $1, email = $2, phone_number = $3, cv = $4 WHERE id = $5 RETURNING *",
        [name, email, phone_number, cv, id]
    );
    return rows[0]; 
}

export const deleteCandidateModel = async (id) =>{
    //Consulta candidato por id, usamos rowCount porque con DELETE row.length siempre devuelve 0
    const { rowCount } = await pool.query('DELETE FROM candidates WHERE id = $1', [id]);
    return rowCount;
}


export const findApplicationsByCandidate = async (id) =>{
    //Consulta para recoger todos los datos necesarios para el resumen de aplicaciones en las tablas:
    //job_offers, companies, applications
    const { rows } = await pool.query(
        `SELECT 
        job_offers.id AS job_offer_id,
        job_offers.title,
        companies.name AS company_name,
        applications.applied_at,
        applications.status
        FROM applications
        JOIN job_offers ON applications.job_offer_id = job_offers.id
        JOIN companies ON job_offers.company_id = companies.id
        WHERE applications.candidate_id = $1
        ORDER BY applications.applied_at DESC;`,
        [id]
    ); 

    return rows;
}