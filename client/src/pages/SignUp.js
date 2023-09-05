import {Link, useNavigate} from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../actions/authActions';
import {selectSignUpErrors} from '../selectors/errorSelectors';

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errors = useSelector(selectSignUpErrors);
    const {
        name,
        email,
        password1,
        password2
    } = errors;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(registerUser({
            name: data.get('name'),
            email: data.get('email'),
            password1: data.get('password1'),
            password2: data.get('password2')
        },
            navigate,
        ))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="family-name"
                                error={!!name}
                                helperText={name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={!!email}
                                helperText={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password1"
                                label="Password"
                                type="password"
                                id="password1"
                                error={!!password1}
                                helperText={password1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password2"
                                label="Re-enter Password"
                                type="password"
                                id="password2"
                                error={!!password2}
                                helperText={password2}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp;