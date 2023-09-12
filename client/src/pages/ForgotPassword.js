import {Box, Typography} from '@mui/material';

const ForgotPassword = () => {
    return (
        <Box mt={4} p={2}>
            <Typography variant="h6">
                You messed up big time! Contact your admin to delete your current account and create a new one!
            </Typography>
            <Typography variant="h6" color="white">
                And let's pray that our overlord does not care for your mistake!
            </Typography>
        </Box>
    )
}

export default ForgotPassword;