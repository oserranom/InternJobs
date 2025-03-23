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


export const applyToJobOffer = async (req, res) =>{

    //verificación de rol
    if(req.role !== "Candidate") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});

    try {

        //Obtención de datos
        const { id: job_id } = req.params;
        const { cover_letter } = req.body; 
        const candidateId = req.id;

        //Autorización
        if(!candidateId) return res.status(404).json({ message: "No autorizado" });

        //Verificación de job_offer? en la BBBDD
        const { rows: jobOffer } = await pool.query("SELECT * FROM job_offers WHERE id = $1", [job_id]);

        if(jobOffer.length === 0) return res.status(404).json({ message: "La oferta no existe" });

        //Verificación de no duplicidad en la aplicación
        const { rows: applications } = await pool.query("SELECT * FROM applications WHERE candidate_id = $1 AND job_offer_id = $2", 
            [candidateId, job_id]
        );

        if(applications.length > 0) return res.status(400).json({ message: "El candidato ya ha aplicado a esta oferta" });

        //Consulta insert
        const { rows } = await pool.query(
            `INSERT INTO applications (candidate_id, job_offer_id, cover_letter) VALUES ($1, $2, $3) RETURNING*`,
            [candidateId, job_id, cover_letter || null]
        );

        return res.status(201).json({
            message: "Has aplicado a la oferta con éxito",
            application: rows[0]
        }); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
    
}