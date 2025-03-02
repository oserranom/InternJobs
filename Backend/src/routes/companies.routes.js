import { Router } from "express";
import { createCompanie, getCompanie, updateCompanie, deleteCompanie } from "../controllers/companies.controllers.js";

const companiesRouter = Router(); 

companiesRouter.post('/', createCompanie);

companiesRouter.get('/:id', getCompanie);

companiesRouter.put('/:id', updateCompanie);

companiesRouter.delete('/:id', deleteCompanie); 


export default companiesRouter; 