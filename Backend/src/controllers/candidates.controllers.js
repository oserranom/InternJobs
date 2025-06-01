import { isValidEmail, isValidPhone } from "../helpers/validations.js";
import { passHash, passMatch } from "../helpers/passwordhash.js";
import { generateJWT } from "../helpers/jwtGenerator.js";
import { 
    deleteCandidateModel,
    findApplicationsByCandidate,
    findCandidateByEmail, 
    findCandidateById, 
    insertNewCandidate, 
    updateCandidateModel 
} from "../models/Candidate.js";


//PUBLIC
export const loginCandidate = async (req, res) =>{
    try {

        const { email, password } = req.body;

        //Validación de email y password no sean null o espacios vacíos 
        if(!email?.trim() || !password?.trim()) return res.status(400).json({ error: 'Email y contraseña son requeridos'});

        //LLamada al moodel
        const candidate = await findCandidateByEmail(email);

        //res 404 en caso de no encontrar candidate
        if(!candidate) return res.status(404).json({ error: `El candidato con email '${email}' no existe`}); 

        //Comprobar contraseña 
        const match = await passMatch(password, candidate.password); 
        if (!match) return res.status(401).json({ error: 'Password incorrecto' });

        //Generar JWT para sesión
        const token = await generateJWT({ id: candidate.id, email: candidate.email, role: "Candidate" }); 

        //Pasa validación y password coincide
        res.status(200).json({
            message: 'Login correcto',
            candidate:{
                id: candidate.id,
                name: candidate.name,
                email: candidate.email,
                token
            }
        }); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'}); 
    }
}


export const createCandidate = async (req, res) =>{
    
    try {
        const { name, email, password, cv, phone_number } = req.body;

        //Validación de campos nulos o espacios vacíos 
        if (!name?.trim() || !email || !password || !phone_number) {
            return res.status(400).json({ message: 'Nombre, email, contraseña y tlf son requeridos' });
        }

        //Validación de email según expresión regular.
        if (!isValidEmail(email)) return res.status(400).json({ message: 'El email introducido no es válido' }); 

        //validación de contraseña de como mínimo 6 dígitos
        if (password.length < 6) return res.status(400).json({message: 'La contraseña debe de contener como mínimo 6 dígitos'});

        //Validación de número según expresión regular.
        if (!isValidPhone(phone_number)) return res.status(400).json({ message: 'Introduce un número válido' }); 

        //Ha pasado las validaciones: 
        //Hash de password
        const hashedPassword = await passHash(password); 

        //LLamada al model
        const candidate = await insertNewCandidate(name, email, hashedPassword, cv, phone_number);
        
        return res.status(201).json({
            message: "Candidato registrado",
            candidate: {
                name: candidate.name,
                email: candidate.email
            }
        }); 
        
    } catch (error) {
        console.error(error); 
        //Separamos el error 23505 de postgres para devolver email ya registrado en la BBDD
        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        return res.status(500).json({message: 'Internal server error'}); 
    }
}


//PRIVATE
export const getCandidate = async (req, res) =>{

    //Validación de rol
    if(req.role !== "Candidate") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});

    try {
        //LLamada al model
        //La id ha sido enviada a la req. desde el middleware
        const candidate = await findCandidateById(req.id); 

        if(!candidate) return res.status(404).json({ message: "El candidato no existe" }); 

        res.status(200).json({
            message: "Candidato obtenido",
            candidate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}



export const updateCandidate = async (req, res) =>{

    if(req.role !== "Candidate") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});

    const { name, email, phone_number, cv } = req.body;

    try {
        //Validaciones
        if(!name?.trim() || !email?.trim() || !phone_number?.trim()) return res.status(400).json({ message: "Los campos nombre, email y tlf son requeridos" });
        if(!isValidEmail(email)) return res.status(400).json({ message: "El email introducido no es válido" });
        if(!isValidPhone(phone_number)) return res.status(400).json({ message: "El tlf introducido no es válido" });

        //LLamada al model 
        const candidate = await updateCandidateModel(name, email, phone_number, cv, req.id);

        if(!candidate) return res.status(404).json({ message: "El candidato no existe" }); 

        return res.json({ 
            message: "Los datos han sido actualizados",
            candidate: {
                name: candidate.name,
                email: candidate.email,
                phone_number: candidate.phone_number,
                cv: candidate.cv,
            }
        }); 

    } catch (error) {

        if(error?.code === '23505') return res.status(409).json({message: 'Este email ya está registrado'});
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' }); 
    }
}


export const deleteCandidate = async (req, res) =>{

    if(req.role !== "Candidate") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});

    try {
        //llamada al model
        const deleted = await deleteCandidateModel(req.id);
        if(deleted === 0) return res.status(404).json({ message: 'EL candidato no existe'});
        return res.status(200).json({ message: 'Candidato eliminado'}); 

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error'}); 
    }

}

export const getApplicationsByCandidate = async (req, res) =>{
    if(req.role !== "Candidate") return res.status(403).json({ message: "No tienes permisos para realizar esa acción "});

    try {
        const applications = await findApplicationsByCandidate(req.id);
        if(!applications) return res.status(404).json({ message: "No se encuentran aplicaciones a ofertas" });
        
        return res.status(200).json(applications); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }

}