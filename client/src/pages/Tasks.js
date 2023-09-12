import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectTaskFilterAndSortOption} from '../selectors/adminSelectors';
import {getTaskList} from '../actions/adminActions';
import {Box, Button, Container, IconButton, InputAdornment, OutlinedInput} from '@mui/material';
import {ArrowBack, Search} from '@mui/icons-material';
import TaskList from '../components/TaskList';
import {useNavigate} from 'react-router-dom';

const Tasks = () => {

    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');

    const filterAndSortOption = useSelector(selectTaskFilterAndSortOption);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    const onInputChange = (event) => {
        setSearchKeyword(event.target.value);
    }

    const handleSearch = () => {
        dispatch(getTaskList({
            ...filterAndSortOption,
            keyword: searchKeyword,
            page: 1,
        }))
    }

    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <Container maxWidth="md">
            <Box mt={4} py={2} boxShadow={2} borderRadius={4}>
                <Box>
                    <Button
                        onClick={handleGoBack}
                        color="primary"
                        startIcon={<ArrowBack/>}
                        sx={{
                            ml: 1,
                            "&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent"
                            }
                        }}
                    >
                        Back to Dashboard
                    </Button>
                </Box>
                <Box p={3}>
                    <OutlinedInput
                        fullWidth
                        placeholder="Search Keyword"
                        value={searchKeyword}
                        onChange={onInputChange}
                        onKeyDown={handleOnKeyDown}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={handleSearch}>
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
                <TaskList/>
            </Box>
        </Container>
    )
}

export default Tasks;