import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Container, IconButton, InputAdornment, OutlinedInput} from '@mui/material';
import {Search} from '@mui/icons-material';

import UserList from '../components/UserList';

import {selectUserFilterAndSortOption} from '../selectors/adminSelectors';
import {getUserList} from '../actions/adminActions';

const Users = () => {

    const [searchKeyword, setSearchKeyword] = useState('');
    const dispatch = useDispatch();

    const filterAndSortOption = useSelector(selectUserFilterAndSortOption);

    const onInputChange = (event) => {
        setSearchKeyword(event.target.value);
    }

    const handleSearch = () => {
        dispatch(getUserList({
            ...filterAndSortOption,
            keyword: searchKeyword
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
                <UserList/>
            </Box>
        </Container>
    )
}

export default Users;