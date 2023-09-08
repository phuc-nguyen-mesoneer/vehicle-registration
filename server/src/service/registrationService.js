import { ObjectId } from 'mongodb';
import db from '../conn.js';
import {provinces} from './provinceCode.js';

const licensePlateCollection = db.collection('licensePlates');

export const generatePlateService = async (userData) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        email,
        idNumber,
        brand,
        model,
        province,
        address,
        phoneNumber,
        gender
    } = userData;
    const existingDocument = await licensePlateCollection.findOne({
        firstName,
        lastName,
        dateOfBirth,
        email,
        idNumber,
        brand,
        model,
        province
    });
    if (!existingDocument) {
        let isPlateDuplicated = false;
        let generatedPlate;
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        do {
            const provinceCode = provinces[province][Math.floor(Math.random() * provinces[province].length)];
            const randomLetter = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
            const randomSingleNumber = Math.floor(Math.random() * 9 + 1);
            let randomIdentificationNumber = Math.floor(Math.random() * 99998 + 1);
            if (randomIdentificationNumber.toString().length < 4) {
                randomIdentificationNumber = ("000" + randomIdentificationNumber).slice(-4);
            }
            generatedPlate = `${provinceCode}${randomLetter}${randomSingleNumber}-${randomIdentificationNumber}`;
            const isExistingPlate = await licensePlateCollection.findOne({plate: generatedPlate});
            if (isExistingPlate) {
                isPlateDuplicated = true;
            } else {
                isPlateDuplicated = false;
            }
        } while (isPlateDuplicated === true);
        const insertResult = await licensePlateCollection.insertOne({
            firstName,
            lastName,
            dateOfBirth,
            email,
            idNumber,
            brand,
            model,
            province,
            address,
            phoneNumber,
            gender,
            plate: generatedPlate,
            status: 'Awaiting confirmation'
        });
        return {
            generatedLicensePlate: generatedPlate,
            plateId: insertResult.insertedId
        };
    } else {
        return {
            plateId: existingDocument._id,
            generatedLicensePlate: existingDocument.plate
        };
    }
}

export const getTaskCount = async () => {
    return await licensePlateCollection.countDocuments({
        status: 'Submitted'
    });
}

export const getTaskService = async (filterAndSortOption) => {
    const {
        page,
        pageSize,
        sortBy,
        sortDirection,
        keyword
    } = filterAndSortOption;

    const queries = {
        status: "Submitted"
    }
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        queries.$or = [
            {firstName: keywordRegex},
            {lastName: keywordRegex},
            {email: keywordRegex},
            {brand: keywordRegex},
            {model: keywordRegex},
            {province: keywordRegex},
            {address: keywordRegex},
        ]
    }

    const taskPromise = licensePlateCollection.find(queries);
    const taskCount = await licensePlateCollection.countDocuments(queries);
    if (sortBy) {
        taskPromise.sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
    }

    if (page && pageSize) {
        taskPromise.skip((Number(page) - 1)*Number(pageSize)).limit(Number(pageSize));
    }

    return {
        taskList: await taskPromise.toArray(),
        taskCount
    }
}

export const updateTaskService  = async (taskData) => {
    const {
        _id,
        plate,
        status
    } = taskData;
    return await licensePlateCollection.updateOne(
        {
            _id: new ObjectId(_id),
            plate: plate
        },
        {
            $set: {
                status: status,
            }
        }
    )
}