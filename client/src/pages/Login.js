import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Button
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../actions/authActions';
import {selectLoginErrors} from '../selectors/errorSelectors';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [remember, setRemember] = useState(false);
    const errors = useSelector(selectLoginErrors);
    const emailError = errors.email;
    const passwordError = errors.password;

    const toggleRememberMe = () => {
        setRemember(!remember);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(loginUser({
            email: data.get('email'),
            password: data.get('password'),
            remember
        }, navigate));
    }

    return (
        <Container maxWidth='xs'>
            <Box textAlign='center' mt={8}>
                <Typography fontWeight='bolder'>
                    Log In
                </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <FormControlLabel
                    control={<Checkbox checked={remember} onChange={toggleRememberMe} value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link to={'/forgot'} variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to='/signup' variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Login;