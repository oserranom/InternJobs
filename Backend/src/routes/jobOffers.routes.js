import { Router } from "express";
import { getJobOffers, getJobOfferById } from "../controllers/jobOffers.controllers.js";


const jobOffersRouter = Router();

//Public
jobOffersRouter.get('/', getJobOffers);
jobOffersRouter.get('/:id', getJobOfferById); 



export default jobOffersRouter; 