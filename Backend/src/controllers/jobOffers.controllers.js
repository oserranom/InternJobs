import { pool } from "../db.js";
import { findApplicationDuplicity, findJobOfferById, findJobOfferByParams, findNewJobOffers, insertApplication } from "../models/JobOffer.js";

export const getJobOffers = async (req, res) =>{
    try {
        const newJobOffers = await findNewJobOffers();
        if(newJobOffers.length === 0) return res.status(404).json({ message: "No se han encontrado ofertas" });
        return res.status(200).json(newJobOffers); 
        
    } catch (error) {
        console.log(error); 
        return res.status(500).json({ error: "Internal server error" }); 
    }
}


export const getJobOfferById = async (req, res) =>{
    try {       
        const { id } = req.params;
        const jobOffer = findJobOfferById(id);
        if(!jobOffer) return res.status(404).json({ message: "La oferta no ha sido encontrada" }); 
        return res.status(200).json(rows[0]); 
    
    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getJobOffersByParams = async (req, res) =>{
    try {
        const { location, education_level, study_field } = req.query; //Captura filtros de la url

        //LLamada a model con params (filtros)
        const search = await findJobOfferByParams(location, education_level, study_field);

        if(search.length === 0) return res.status(404).json({ message: "No se han encontrado ofertas para esos filtros" });

        return res.status(200).json(search);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" }); 
    }
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
        const jobOffer = await findJobOfferById(job_id);
        if(!jobOffer) return res.status(404).json({ message: "La oferta no existe" });

        //Verificación de no duplicidad en la aplicación
        const applications = await findApplicationDuplicity(candidateId, job_id);
        if(applications.length > 0) return res.status(400).json({ message: "El candidato ya ha aplicado a esta oferta" });

        //Consulta insert
        const application = await insertApplication(candidateId, job_id, cover_letter || null);

        return res.status(201).json({
            message: "Has aplicado a la oferta con éxito",
            application
        }); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
    
}