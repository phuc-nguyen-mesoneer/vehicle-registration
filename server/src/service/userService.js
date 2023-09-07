import db from '../conn.js';
import bcrypt from 'bcryptjs';
import {ObjectId} from 'mongodb';

const userCollection = db.collection('popoUsers');

export const getUserFromEmail = async (email) => {
    return await userCollection.findOne({email: email});
}

export const signUpNewUser = async (data) => {
    const { name, email, password1 } = data;
    const hash = await bcrypt.hash(password1, 10);
    const user = await userCollection.insertOne({
        email,
        name,
        password: hash,
        role: 'Civil Protection'
    });
    return user;
}

export const getUsers = async (filterAndSortOption, queriedRoles) => {
    const {
        page,
        pageSize,
        sortBy,
        sortDirection,
        keyword,
    } = filterAndSortOption;


    const queries = {
        role: {
            $in: queriedRoles
        }
    }

    if (keyword) {
        const keywordRegex = new RegExp(keyword, 'i');
        queries.$or = [
            {name: keywordRegex},
            {email: keywordRegex}
        ]
    }

    const usersPromise = userCollection.find(queries);
    const userCount = await userCollection.countDocuments(queries);

    if (sortBy) {
        usersPromise.sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
    }
    if (page && pageSize) {
        usersPromise.skip((Number(page) - 1)*Number(pageSize)).limit(Number(pageSize));
    }
    const userList = await usersPromise.project({
        name: 1,
        email: 1,
        role: 1,
    }).toArray();

    return {
        userList,
        userCount
    };
}

export const countUsers = async (subordinateRanks) => {
    return await userCollection.countDocuments({role: {$in: subordinateRanks}});
}

export const updateUser = async (userData) => {
    return await userCollection.updateOne(
        {
            _id: new ObjectId(userData._id)
        },
        {
            $set: {
                role: userData.role
            }
        }
    );
}