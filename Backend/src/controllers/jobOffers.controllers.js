import { pool } from "../db.js";

export const getJobOffers = async (req, res) =>{
    try {
        //Consulta para traer de la BBDD las últimas 15 job_offers en orden cronológico inverso
        //Se requiere un JOIN ya que nos traemos el name de la tabla companies también 
        const { rows } = await pool.query(
            `SELECT job_offers.*, companies.name AS company_name 
            FROM job_offers 
            JOIN companies ON job_offers.company_id = companies.id 
            ORDER BY job_offers.created_at DESC 
            LIMIT 15`
        );

        if(rows.length === 0) return res.status(404).json({ message: "No se han encontrado ofertas" });

        return res.status(200).json(rows); 
        
    } catch (error) {
        console.log(error); 
        return res.status(500).json({ error: "Internal server error" }); 
    }
}

export const getJobOfferById = async (req, res) =>{
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM job_offers WHERE id = $1", [id]); 
    if(rows.length === 0) return res.status(404).json({ message: "La oferta no ha sido encontrada" }); 
    return res.status(200).json(rows[0]); 
}