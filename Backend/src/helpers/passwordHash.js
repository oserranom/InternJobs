import bcrypt from 'bcryptjs';

export const passHash = async (password) =>{
    const salt = await bcrypt.genSalt(5);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass; 
}