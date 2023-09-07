import UserList from '../components/UserList';
import {
    Box,
    Container, Typography
} from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectTotalTaskCount, selectTotalUserCount} from '../selectors/adminSelectors';
import {useEffect} from 'react';
import {getSummaryData} from '../actions/adminActions';
import {selectUser} from '../selectors/authSelectors';
import TaskList from '../components/TaskList';

import ranks from '../utils/ranks.json';

const Dashboard = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectUser);

    useEffect(() => {
        if (currentUser && (ranks[currentUser.role] > ranks['Civil Protection'])) {
            dispatch(getSummaryData());
        }

    }, [currentUser]);

    const totalUserCount = useSelector(selectTotalUserCount);
    const totalTaskCount = useSelector(selectTotalTaskCount);

    return (
        <Container maxWidth="md">
            {
                currentUser && ranks[currentUser.role] > ranks['Civil Protection']
                    ?
                    <>
                        <Box mt={4} py={2} boxShadow={2} borderRadius={4}>
                            <Box mx={2} my={2}>
                                You have {totalUserCount} <Link to="/users">subordinates</Link>.
                                Make sure to keep them in check!
                            </Box>
                            <UserList isSummary={true}/>
                        </Box>
                        <Box mt={4} py={2} boxShadow={2} borderRadius={4}>
                            <Box mx={2} my={2}>
                                You have {totalTaskCount} <Link to="/tasks">tasks</Link>. Take your time!
                            </Box>
                            <TaskList isSummary={true}/>
                        </Box>
                    </>
                    :
                    <Box mt={4} p={2}>
                        <Typography variant="h6">
                            Your rank is too low to perform any action.
                        </Typography>
                        <Typography variant="h6" color="white">
                            Lick your boss's boots to climb up the rank.
                        </Typography>
                    </Box>
            }
        </Container>
    )
}

export default Dashboard;