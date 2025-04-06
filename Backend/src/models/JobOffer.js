import { pool } from "../db.js";

export const findNewJobOffers = async ()=>{
    //Consulta para traer de la BBDD las últimas 15 job_offers en orden cronológico inverso
    //Se requiere un JOIN ya que nos traemos el name de la tabla companies también 
    const { rows } = await pool.query(
        `SELECT job_offers.*, companies.name AS company_name 
        FROM job_offers 
        JOIN companies ON job_offers.company_id = companies.id 
        ORDER BY job_offers.created_at DESC 
        LIMIT 15`
    );
    return rows; 
}

export const findJobOfferById = async (id) =>{
    const { rows } = await pool.query(
        `SELECT job_offers.*, companies.name AS company_name
        FROM job_offers
        JOIN companies ON job_offers.company_id = companies.id
        WHERE job_offers.id = $1`, 
        [id]
    ); 
    return rows[0]; 
}


export const findJobOfferByParams = async(location, education_level, study_field)=>{
    //Consulta select con params obtenido de la url con req.query 
    //Se utiliza WHERE 1=1 como un "hack" para que la consulta no muera y poder ir añadiendo filtros en la query

    let query = `SELECT job_offers.*, companies.name AS company_name
                FROM job_offers
                JOIN companies ON job_offers.company_id = companies.id
                WHERE 1=1`

    const params = [];

    if(location?.trim()) {
        params.push(location);
        query += ` AND job_offers.location = $${params.length}`;
    }

    if(education_level?.trim()){
        params.push(education_level);
        query += ` AND job_offers.education_level = $${params.length}`;
    }

    if(study_field?.trim()){
        params.push(study_field);
        query += ` AND job_offers.study_field = $${params.length}`;
    }

    query += ` ORDER BY job_offers.created_at DESC LIMIT 15`;

    const { rows } = await pool.query(query, params);

    return rows; 
}

export const findApplicationDuplicity = async (candidateId, job_id)=>{
    const { rows } = await pool.query(
        "SELECT * FROM applications WHERE candidate_id = $1 AND job_offer_id = $2", 
        [candidateId, job_id]
    );
    return rows; 
}

export const insertApplication = async (candidateId, job_id, cover_letter)=>{
    const { rows } = await pool.query(
        `INSERT INTO applications (candidate_id, job_offer_id, cover_letter) VALUES ($1, $2, $3) RETURNING*`,
        [candidateId, job_id, cover_letter]
    );
    return rows[0]; 
}