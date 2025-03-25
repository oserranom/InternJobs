import { Router } from "express";
import {
  createCompanie,
  getCompany, 
  updateCompany, 
  deleteCompany, 
  createJobOffer, 
  loginCompanie, 
  getJobOffersByCompany,
  getJobOfferByIdCom, 
  deleteJobOffer, 
  updateJobOffer,
  getApplicationsByCompany,
  getApplicationById,
  updateApplicaion
} from "../controllers/companies.controllers.js";
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

//Private single offer management
companiesRouter.get('/jobs/:id', verifyToken, getJobOfferByIdCom); 
companiesRouter.put('/jobs/:id', verifyToken, updateJobOffer);  
companiesRouter.delete('/jobs/:id', verifyToken, deleteJobOffer); 

//Private applications management
companiesRouter.get('/applications', verifyToken, getApplicationsByCompany);
companiesRouter.get('/applications/:id', verifyToken, getApplicationById);
companiesRouter.patch('/applications/:id', verifyToken, updateApplicaion);

export default companiesRouter;