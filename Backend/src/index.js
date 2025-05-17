import express from "express";
import cors from 'cors'; 
import { PORT } from "./config.js";
import candidatesRouter from "./routes/candidates.routes.js";
import jobOffersRouter from "./routes/jobOffers.routes.js";
import companiesRouter from "./routes/companies.routes.js";


const app = express();

app.use(express.json());

//Confirguración de CORS 
// OJO quitar undefined de la whitelist en producción
const whitelist = [process.env.FRONTEND_URL, undefined]; 

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            //Permite conexión
            callback(null, true);
        }else{
            //Deniega conexión
            callback(new Error('No permitido por CORS')); 
        }
    }
}


app.use(cors(corsOptions)); 


app.use('/api/candidates', candidatesRouter); 
app.use('/api/jobs', jobOffersRouter); 
app.use('/api/companies', companiesRouter); 


app.listen(PORT);
console.log('Server running on port: ', PORT); 
console.log('CORS url accepted: ', process.env.FRONTEND_URL); 