export const ranks = {
    'Civil Protection': 0,
    'Elite': 1,
    'Representative': 2,
    'Advisor': 3,
}

export const authorizedRank = ranks['Elite'];

export const rankChecking = (req, res) => {
    const { role } = req.user;
    if (ranks[role] < authorizedRank) {
        return res.status(400).json({
            error: 'You are not allowed to perform this action'
        });
    } else {
        return true;
    }
}

export const getSubordinateRanks = (role) => {
    const returnedRanks = [];
    Object.keys(ranks).forEach(rank => {
        if (ranks[rank] < ranks[role]) {
            returnedRanks.push(rank);
        }
    });
    return returnedRanks;
}