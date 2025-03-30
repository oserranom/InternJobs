import { Router } from "express";
import { getJobOffers, getJobOfferById, applyToJobOffer, getJobOffersByParams } from "../controllers/jobOffers.controllers.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const jobOffersRouter = Router();

//Public
jobOffersRouter.get('/', getJobOffers);
jobOffersRouter.get('/search', getJobOffersByParams)
jobOffersRouter.get('/:id', getJobOfferById); 

//Private candidate
jobOffersRouter.post('/:id/apply', verifyToken, applyToJobOffer); 

export default jobOffersRouter; 