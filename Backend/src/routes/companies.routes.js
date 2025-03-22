import { Router } from "express";
import { createCompanie, getCompanie, updateCompanie, deleteCompanie, createJobOffer, loginCompanie, getJobOffersByCompany } from "../controllers/companies.controllers.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const companiesRouter = Router(); 

//Public
companiesRouter.post('/', createCompanie);
companiesRouter.post('/login', loginCompanie); 


//Private profile
companiesRouter.get('/profile', verifyToken, getCompanie);
companiesRouter.put('/profile', verifyToken, updateCompanie);
companiesRouter.delete('/profile', verifyToken, deleteCompanie); 

//Private offers management 
companiesRouter.post('/jobs', verifyToken, createJobOffer); 
companiesRouter.get('/jobs', verifyToken, getJobOffersByCompany); 


export default companiesRouter;