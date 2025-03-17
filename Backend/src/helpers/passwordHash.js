import bcrypt from 'bcryptjs';

export const passHash = async (password) =>{
    try {
        const salt = await bcrypt.genSalt(5);
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    } catch (error) {
        console.log(error); 
    }
     
}

export const passMatch = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); 
}