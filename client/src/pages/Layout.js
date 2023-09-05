import {Link, Outlet, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {
    AppBar,
    Box
} from '@mui/material';
import NotificationCentral from './NotificationCentral';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../selectors/authSelectors';
import {loadUserFromJWT, logoutUser} from '../actions/authActions';
import {useEffect} from 'react';

const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user) {
            console.log('User is not found');
            let jwt = Cookies.get('token');
            if (!jwt) {
                jwt = sessionStorage.getItem('token');
            }
            if (jwt) {
                dispatch(loadUserFromJWT(jwt));
            }
        } else {
            if (window.location.pathname !== '/tasks') {
                navigate('/tasks');
            }
        }
    }, [user]);

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatch(logoutUser(navigate));
    }


    return (
        <>
            <NotificationCentral />
            <Box>
                <AppBar
                    position='sticky'
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 2
                    }}
                >
                    <Box>
                        Rubicon's AC Registration service
                    </Box>
                    <Box display='flex' flexDirection='row'>
                        {
                            user ?
                                <Link to="#" onClick={handleLogOut} >
                                    Log Out
                                </Link>
                                :
                                <>
                                    <Link to="/login" >
                                        Log In
                                    </Link>
                                    <Box px={1}>
                                        /
                                    </Box>
                                    <Link to="/signup">
                                        Sign Up
                                    </Link>
                                </>
                        }

                    </Box>
                </AppBar>
            </Box>
            <Outlet />
        </>
    )
}

export default Layout;