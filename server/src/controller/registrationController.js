import {validatePlateGenerationInput} from '../validation.js';

export const generatePlateController = (req, res) => {
    const { errors, isValid } = validatePlateGenerationInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    } else {

    }
}