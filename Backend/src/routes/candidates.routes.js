import { Router } from "express";
import { createCandidate, getCandidate, updateCandidate, deleteCandidate, loginCandidate } from "../controllers/candidates.controllers.js";

const candidatesRouter = Router();

candidatesRouter.post('/login', loginCandidate); 

candidatesRouter.post('/', createCandidate);

candidatesRouter.get('/:id', getCandidate);

candidatesRouter.put('/:id', updateCandidate);

candidatesRouter.delete('/:id', deleteCandidate); 


export default candidatesRouter; 