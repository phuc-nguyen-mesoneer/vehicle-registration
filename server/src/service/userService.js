import db from '../conn.js';
import bcrypt from 'bcryptjs';

export const getUserFromEmail = async (email) => {
    const existingUser = await db.collection('popoUsers').findOne({email: email});
    return existingUser;
}

export const signUpNewUser = async (data) => {
    const { name, email, password1 } = data;
    const hash = await bcrypt.hash(password1, 10);
    const user = await db.collection('popoUsers').insertOne({
        email,
        name,
        password: hash,
        role: 'Civil Protection'
    });
    return user;
}
