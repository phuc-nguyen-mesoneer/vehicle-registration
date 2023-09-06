import {validatePlateGenerationInput} from '../validation.js';
import {generatePlateService} from '../service/registrationService.js';

export const generatePlateController = async (req, res) => {
    const { errors, isValid } = validatePlateGenerationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const generatedPlate = await generatePlateService(req.body);
        return res.status(200).json({
            generatedPlate
        });
    }
}