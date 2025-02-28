import express from "express";
import { PORT } from "./config.js";
import candidatesRouter from "./routes/candidates.routes.js";
import jobOffersRouter from "./routes/jobOffers.routes.js";


const app = express();


app.use(express.json());
app.use('/candidates', candidatesRouter); 
app.use('/jobs', jobOffersRouter); 


app.listen(PORT);
console.log('Server running on port', PORT); 