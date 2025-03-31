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
    const { rows } = await pool.query("SELECT name, email, phone_number, cv FROM candidates WHERE id = $1", [id]);
    return rows[0];
}