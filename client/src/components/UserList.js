import UserTableColumns from './UserTableColumns';
import GenericTable from './GenericTable';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectUserCount,
    selectUserFilterAndSortOption,
    selectUserList,
    selectUserListLoading
} from '../selectors/adminSelectors';
import {useEffect, useState} from 'react';
import {deleteUser, getSummaryData, getUserList, setUserRole} from '../actions/adminActions';
import {selectUser} from '../selectors/authSelectors';
import {Container} from '@mui/material';

import ranks from '../utils/ranks.json';
import ConfirmDialog from './ConfirmDialog';

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

    const [dialogState, setDialogState] = useState({
        isOpen: false,
        title: '',
        content: '',
        onConfirm: () => {},
    });

    const handleCloseDialog = () => {
        setDialogState({
            ...dialogState,
            isOpen: false
        })
    }

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
        );
        handleCloseDialog();
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
        );
        handleCloseDialog();
    }

    const handleDeleteUser = (currentUser) => () => {
        dispatch(deleteUser(
            currentUser,
            () => {
                dispatch(getUserList(userFilterAndSortOption));
                dispatch(getSummaryData());
            })
        );
        handleCloseDialog();
    }

    const onPromoteClick = (currentUser) => () => {
        setDialogState({
            isOpen: true,
            title: `Are you sure you want to promote this ${currentUser.role}`,
            content: 'This creature may one day outrank you. Be careful with your decision!',
            onConfirm: handlePromoteUser(currentUser)
        })
    }

    const onDemoteClick = (currentUser) => () => {
        setDialogState({
            isOpen: true,
            title: `Are you sure you want to demote this ${currentUser.role}`,
            content: 'If this creature has committed something horrendous, it would be wiser to delete them.',
            onConfirm: handleDemoteUser(currentUser)
        })
    }

    const onDeleteClick = (currentUser) => () => {
        setDialogState({
            isOpen: true,
            title: `Are you sure you want to delete this ${currentUser.role}`,
            content: 'Make sure that you only delete the creature in the system after you have deleted them in real life with either a pulse rifle or the Zero Point Energy Field Manipulator!',
            onConfirm: handleDeleteUser(currentUser)
        })
    }

    const columns = UserTableColumns(
        user,
        onPromoteClick,
        onDemoteClick,
        onDeleteClick
    );
    return (
        <>
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
            <ConfirmDialog
                isOpen={dialogState.isOpen}
                title={dialogState.title}
                content={dialogState.content}
                onClose={handleCloseDialog}
                onConfirm={dialogState.onConfirm}
            />
        </>
    )
}

export default UserList;