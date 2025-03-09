import express from "express";
import { PORT } from "./config.js";
import candidatesRouter from "./routes/candidates.routes.js";
import jobOffersRouter from "./routes/jobOffers.routes.js";
import companiesRouter from "./routes/companies.routes.js";


const app = express();

app.use(express.json());


app.use('/api/candidates', candidatesRouter); 
app.use('/api/jobs', jobOffersRouter); 
app.use('/api/companies', companiesRouter); 


app.listen(PORT);
console.log('Server running on port', PORT); 