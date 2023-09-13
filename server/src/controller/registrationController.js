import {validatePlateGenerationInput} from '../validation.js';
import {
    deleteTaskService,
    generatePlateService,
    getTaskCount,
    getTaskService,
    updateTaskService
} from '../service/registrationService.js';
import {getSubordinateRanks, rankChecking} from '../ranks.js';
import {countUsers} from '../service/userService.js';

export const generatePlate = async (req, res) => {
    const {errors, isValid} = validatePlateGenerationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const {generatedLicensePlate, plateId} = await generatePlateService(req.body);
        return res.status(200).json({
            generatedLicensePlate,
            plateId
        });
    }
}

export const submitPlate = async (req, res) => {
    try {
        await updateTaskService({
            _id: req.body.plateId,
            plate: req.body.generatedPlate,
            status: "Submitted",
        });
        return res.status(200).json({
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            internalError: err
        })
    }

}

export const getSummaryData = async (req, res) => {
    const isAuthorized = rankChecking(req, res);
    if (isAuthorized) {
        const subordinateRanks = getSubordinateRanks(req.user.role);
        const totalUserCount = await countUsers(subordinateRanks);
        const totalTaskCount = await getTaskCount();
        return res.status(200).json({
            totalUserCount,
            totalTaskCount
        });
    }
}

export const getTaskList = async (req, res) => {
    const isAuthorized = rankChecking(req, res);
    if (isAuthorized) {
        try {
            const tasks = await getTaskService(req.body);
            return res.status(200).json(tasks)
        } catch (err) {
            return res.status(500).json({
                internalError: err
            })
        }

    }
}

export const updateTask = async (req, res) => {
    const isAuthorized = rankChecking(req, res);
    if (isAuthorized) {
        try {
            await updateTaskService({
                ...req.body
            });
            return res.status(200).json({
                success: true,
            });
        } catch (err) {
            return res.status(500).json({
                internalError: err
            })
        }
    }
}

export const deleteTask = async (req, res) => {
    const isAuthorized = rankChecking(req, res);
    if (isAuthorized) {
        try {
            await deleteTaskService(req.body);
            return res.status(200).json({
                success: true,
            })
        } catch (err) {
            return res.status(500).json({
                internalError: err
            })
        }
    }
}