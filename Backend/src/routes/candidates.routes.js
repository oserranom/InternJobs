import { Router } from "express";
import { createCandidate, getCandidate, updateCandidate, deleteCandidate, loginCandidate } from "../controllers/candidates.controllers.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const candidatesRouter = Router();

//Public
candidatesRouter.post('/login', loginCandidate); 
candidatesRouter.post('/', createCandidate);

//Private
candidatesRouter.get('/profile', verifyToken, getCandidate);
candidatesRouter.put('/profile', verifyToken, updateCandidate);
candidatesRouter.delete('/profile', verifyToken, deleteCandidate); 


export default candidatesRouter; 