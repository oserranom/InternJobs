import { Router } from "express";
import { createCompanie, getCompanie, updateCompanie, deleteCompanie, createJobOffer } from "../controllers/companies.controllers.js";

const companiesRouter = Router(); 

companiesRouter.post('/', createCompanie);

companiesRouter.get('/:id', getCompanie);

companiesRouter.put('/:id', updateCompanie);

companiesRouter.delete('/:id', deleteCompanie); 

companiesRouter.post('/:id/jobs', createJobOffer); 


export default companiesRouter; 