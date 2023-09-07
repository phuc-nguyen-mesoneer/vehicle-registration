import UserTableColumns from './UserTableColumns';
import GenericTable from './GenericTable';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectUserCount,
    selectUserFilterAndSortOption,
    selectUserList,
    selectUserListLoading
} from '../selectors/adminSelectors';
import {useEffect} from 'react';
import {getSummaryData, getUserList, setUserRole} from '../actions/adminActions';
import {selectUser} from '../selectors/authSelectors';
import {Container} from '@mui/material';

import ranks from '../utils/ranks.json';

const UserList = ({isSummary = false}) => {

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const userListLoading = useSelector(selectUserListLoading);
    const userList = useSelector(selectUserList);
    const userCount = useSelector(selectUserCount);
    const userFilterAndSortOption = useSelector(selectUserFilterAndSortOption);
    const {
        sortBy,
        sortDirection,
        page,
        pageSize
    } = userFilterAndSortOption;

    useEffect(() => {
        if (user) {
            dispatch(getUserList(userFilterAndSortOption));
        }
    }, [user]);

    const handleSortingOptionChange = (sortField) => () => {
        if (sortField === sortBy) {
            dispatch(getUserList({
                    ...userFilterAndSortOption,
                    sortDirection: sortDirection === 'asc' ? 'desc' : 'asc'
                }
            ));
        } else {
            dispatch(getUserList({
                    ...userFilterAndSortOption,
                    sortBy: sortField,
                    sortDirection: 'asc'
                })
            )
        }
    }

    const handlePageChange = (event, newPage) => {
        dispatch(getUserList({
            ...userFilterAndSortOption,
            page: newPage + 1
        }));
    }

    const handlePageSizeChange = (event) => {
        dispatch(getUserList({
            ...userFilterAndSortOption,
            pageSize: parseInt(event.target.value, 10),
            page: 1
        }));
    }

    const handlePromoteUser = (currentUser) => () => {
        dispatch(
            setUserRole(
                {
                    ...currentUser,
                    role: Object.keys(ranks).find(key => ranks[key] === ranks[currentUser.role] + 1)
                },
                () => {
                    dispatch(getUserList(userFilterAndSortOption));
                    dispatch(getSummaryData());
                }
            )
        )
    }

    const handleDemoteUser = (currentUser) => () => {
        dispatch(
            setUserRole(
                {
                    ...currentUser,
                    role: Object.keys(ranks).find(key => ranks[key] === ranks[currentUser.role] - 1)
                },
                () => {
                    dispatch(getUserList(userFilterAndSortOption));
                    dispatch(getSummaryData());
                }
            )
        )
    }

    const handleDeleteUser = (currentUser) => () => {

    }

    const columns = UserTableColumns(
        user,
        handlePromoteUser,
        handleDemoteUser,
        handleDeleteUser
    );
    return (
        <Container maxWidth="md">
            <GenericTable
                isLoading={userListLoading}
                isSummary={isSummary}
                rows={userList}
                totalRowCounts={userCount}
                columns={columns}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortingOptionChange={handleSortingOptionChange}
                page={page}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
            />
        </Container>
    )
}

export default UserList;