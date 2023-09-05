import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    FormControl,
    Button, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { Link } from 'react-router-dom';
import {useState} from 'react';

const RegistrationForm = () => {

    const [isGenerated, setIsGenerated] = useState(false);

    const toggleIsGenerated = () => {
        setIsGenerated(!isGenerated);
    }

    return (
        <Container maxWidth='xs'>
            <Box textAlign='center' mt={8}>
                <Typography fontWeight='bolder'>
                    AC Registration Form
                </Typography>
            </Box>
            <Box
                component='form'
                // onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="Date Of Birth"
                    name="dateOfBirth"
                    type="date"
                    autoFocus
                    InputLabelProps={{shrink: true}}
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="identification"
                    label="Identification Number"
                    name="identification"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="acModel"
                    label="AC Model"
                    name="acModel"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="callSign"
                    label="Call Sign"
                    name="callSign"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    autoFocus
                    InputProps={{
                        readOnly: isGenerated
                    }}
                />
                <FormControl disabled={isGenerated}>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="non-binary" control={<Radio />} label="Non binary" />
                    </RadioGroup>
                </FormControl>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Button
                        onClick={toggleIsGenerated}
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Generate
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default RegistrationForm;