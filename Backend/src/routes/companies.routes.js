import { Router } from "express";
import { createCompanie, getCompany, updateCompany, deleteCompany, createJobOffer, loginCompanie, getJobOffersByCompany } from "../controllers/companies.controllers.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const companiesRouter = Router(); 

//Public
companiesRouter.post('/', createCompanie);
companiesRouter.post('/login', loginCompanie); 


//Private profile
companiesRouter.get('/profile', verifyToken, getCompany);
companiesRouter.put('/profile', verifyToken, updateCompany);
companiesRouter.delete('/profile', verifyToken, deleteCompany); 

//Private offers management 
companiesRouter.post('/jobs', verifyToken, createJobOffer); 
companiesRouter.get('/jobs', verifyToken, getJobOffersByCompany); 


export default companiesRouter;