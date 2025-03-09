import { pool } from "../db.js";

export const getJobOffers = async (req, res) =>{
    try {
        const { rows } = await pool.query('SELECT * FROM job_offers');
        res.status(200).json(rows); 
    } catch (error) {
        res.status(500).json({ error: "Internal server error"}); 
    }

}

