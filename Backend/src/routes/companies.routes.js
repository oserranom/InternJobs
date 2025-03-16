import { Router } from "express";
import { createCompanie, getCompanie, updateCompanie, deleteCompanie, createJobOffer, loginCompanie, getJobOffersByCompany } from "../controllers/companies.controllers.js";

const companiesRouter = Router(); 

companiesRouter.post('/', createCompanie);

companiesRouter.post('/login', loginCompanie); 

companiesRouter.get('/:id', getCompanie);

companiesRouter.put('/:id', updateCompanie);

companiesRouter.delete('/:id', deleteCompanie); 

companiesRouter.post('/:id/jobs', createJobOffer); 

companiesRouter.get('/:id/jobs', getJobOffersByCompany); 


export default companiesRouter; 