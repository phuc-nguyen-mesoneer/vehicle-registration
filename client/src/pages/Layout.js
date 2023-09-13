import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

import {
    AppBar,
    Box, Typography
} from '@mui/material';

import AppLogo from './logo.png';
import NotificationCentral from './NotificationCentral';
import {selectUser} from '../selectors/authSelectors';
import {loadUserFromJWT, logoutUser} from '../actions/authActions';


const loggedInPaths = ["/dashboard", "/tasks", "/users"];

const LinkStyle = {
    textDecoration: "none",
    color: "white",
}

const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user) {
            let jwt = Cookies.get('token');
            if (!jwt) {
                jwt = sessionStorage.getItem('token');
            }
            if (jwt) {
                dispatch(loadUserFromJWT(jwt, navigate));
            } else {
                if (loggedInPaths.includes(window.location.pathname)) {
                    navigate('/');
                }
            }
        } else {
            if (!loggedInPaths.includes(window.location.pathname)) {
                navigate('/dashboard');
            }
        }
    }, [user]);

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatch(logoutUser(navigate));
    }

    return (
        <>
            <NotificationCentral/>
            <Box>
                <AppBar
                    position="sticky"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 2
                    }}
                >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Link to={user ? '/dashboard' : '/'}>
                            <img src={AppLogo} alt="AppLogo" style={{width: 40, height: 31}}/>
                        </Link>
                        <Link to={user ? '/dashboard' : '/'} style={{textDecoration: 'none'}}>
                            <Typography ml={2} color="white">
                                Rubicon's AC Registration service
                            </Typography>
                        </Link>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        {
                            user ?
                                <Link to="#" onClick={handleLogOut} style={LinkStyle}>
                                    Log Out
                                </Link>
                                :
                                <>
                                    <Link to="/login" style={LinkStyle}>
                                        Log In
                                    </Link>
                                    <Box px={1}>
                                        /
                                    </Box>
                                    <Link to="/signup" style={LinkStyle}>
                                        Sign Up
                                    </Link>
                                </>
                        }
                    </Box>
                </AppBar>
            </Box>
            <Outlet/>
        </>
    )
}

export default Layout;