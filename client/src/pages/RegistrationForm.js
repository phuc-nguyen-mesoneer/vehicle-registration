import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Container,
    Box,
    Typography,
    TextField,
    FormControl,
    Button,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

import provinceList from '../utils/provinceCode.json';

import {generateLicensePlate, submitLicensePlate} from '../actions/registrationActions';
import {selectRegistrationFormError} from '../selectors/errorSelectors';
import {
    selectIsPlateLoading,
    selectIsPlateGenerated,
    selectGeneratedLicensePlate, selectPlateId
} from '../selectors/registrationSelectors';

const RegistrationForm = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
       firstName: '',
       lastName: '',
       dateOfBirth: '',
       email: '',
       idNumber: '',
       model: '',
       brand: '',
       province: '',
       address: '',
       phoneNumber: '',
       gender: 'non-binary'
    });

    const isPlateLoading = useSelector(selectIsPlateLoading);
    const isPlateGenerated = useSelector(selectIsPlateGenerated);
    const isReadOnly = isPlateLoading || isPlateGenerated;

    const generatedPlate = useSelector(selectGeneratedLicensePlate);
    const plateId = useSelector(selectPlateId);

    const errors = useSelector(selectRegistrationFormError);
    const {
        firstName: firstNameError,
        lastName: lastNameError,
        dateOfBirth: dateOfBirthError,
        email: emailError,
        idNumber: idNumberError,
        model: modelError,
        brand: brandError,
        province: provinceError,
    } = errors;

    const handleChangeFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleGenerate = () => {
        dispatch(generateLicensePlate(formData));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(submitLicensePlate({plateId, generatedPlate}));
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
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.firstName}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    inputProps={{
                        'aria-label': 'firstName',
                    }}
                    error={!!firstNameError}
                    helperText={firstNameError}
                />
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.lastName}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'lastName',
                    }}
                    error={!!lastNameError}
                    helperText={lastNameError}
                />
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.dateOfBirth}
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="Date Of Birth"
                    name="dateOfBirth"
                    type="date"
                    autoFocus
                    InputLabelProps={{shrink: true}}
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'dateOfBirth',
                    }}
                    error={!!dateOfBirthError}
                    helperText={dateOfBirthError}
                />
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'email',
                    }}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.idNumber}
                    required
                    fullWidth
                    id="idNumber"
                    label="Identification Number"
                    name="idNumber"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'idNumber',
                    }}
                    error={!!idNumberError}
                    helperText={idNumberError}
                />
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.brand}
                    required
                    fullWidth
                    id="brand"
                    label="Brand"
                    name="brand"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'brand',
                    }}
                    error={!!brandError}
                    helperText={brandError}
                />
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.model}
                    required
                    fullWidth
                    id="model"
                    label="Model"
                    name="model"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'model',
                    }}
                    error={!!modelError}
                    helperText={modelError}
                />
                <FormControl fullWidth sx={{mt: '16px', mb: '8px'}}>
                    <InputLabel id="province">City/Province</InputLabel>
                    <Select
                        labelId="province"
                        id="province"
                        name="province"
                        label="City/Province"
                        onChange={handleChangeFormData}
                        value={formData.province}
                        disabled={isReadOnly}
                        error={!!provinceError}
                        inputProps={{
                            'aria-label': 'province',
                        }}
                    >
                        {
                            Object.keys(provinceList).sort().map(province =>
                                <MenuItem value={province} key={province}>{province}</MenuItem>
                            )
                        }
                    </Select>
                    {
                        provinceError &&
                        <FormHelperText error>{provinceError}</FormHelperText>
                    }
                </FormControl>
                <TextField
                    margin="normal"
                    onChange={handleChangeFormData}
                    value={formData.address}
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'address',
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    onChange={handleChangeFormData}
                    value={formData.phoneNumber}
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    autoFocus
                    InputProps={{
                        readOnly: isReadOnly
                    }}
                    inputProps={{
                        'aria-label': 'phoneNumber',
                    }}
                />
                <FormControl disabled={isReadOnly}>
                    <FormLabel id="gender-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="gender-label"
                        defaultValue="non-binary"
                        name="gender"
                        onChange={handleChangeFormData}
                        value={formData.gender}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="non-binary" control={<Radio />} label="Non binary" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    margin="normal"
                    fullWidth
                    value={generatedPlate || ''}
                    inputProps={{
                        "aria-label": "generated-plate",
                        style: {
                            textAlign: 'center',
                        }
                    }}
                    InputProps={{
                        readOnly: true,
                        style: {
                            height: '120px',
                            fontSize: '32px',
                            fontWeight: 'bolder',
                        }
                    }}
                />
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Button
                        disabled={isReadOnly}
                        onClick={handleGenerate}
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Generate
                    </Button>
                    <Button
                        disabled={!isPlateGenerated || isPlateLoading}
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