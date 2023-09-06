import db from '../conn.js';
import {provinces} from './provinceCode.js';

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
    const existingDocument = await db.collection('licensePlates').findOne({
        firstName,
        lastName,
        dateOfBirth,
        email,
        idNumber,
        brand,
        model,
        province,
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
            const isExistingPlate = await db.collection('licensePlates').findOne({plate: generatedPlate});
            if (isExistingPlate) {
                isPlateDuplicated = true;
            } else {
                isPlateDuplicated = false;
            }
        } while (isPlateDuplicated === true);
        await db.collection('licensePlates').insertOne({
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
        return generatedPlate;
    } else {
        return existingDocument.plate;
    }
}