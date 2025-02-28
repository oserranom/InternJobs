import { Router } from "express";
import { getJobOffers } from "../controllers/jobOffers.controllers.js";


const jobOffersRouter = Router();


jobOffersRouter.get('/', getJobOffers);



export default jobOffersRouter; 