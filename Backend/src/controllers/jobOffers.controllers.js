import { pool } from "../db.js";

export const getJobOffers = async (req, res) =>{
    try {
        const { rows } = await pool.query('SELECT * FROM job_offers ORDER BY created_at DESC LIMIT 10');
        res.status(200).json(rows); 

        if(rows.length === 0) return res.status(404).json({ message: "No se han encontrado ofertas" });
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: "Internal server error"}); 
    }
}

