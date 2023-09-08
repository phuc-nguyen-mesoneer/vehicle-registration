import {Container} from '@mui/material';
import GenericTable from './GenericTable';
import TaskTableColumns from './TaskTableColumns';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectTaskCount,
    selectTaskFilterAndSortOption,
    selectTaskList,
    selectTaskListLoading
} from '../selectors/adminSelectors';
import {useEffect, useState} from 'react';
import {selectUser} from '../selectors/authSelectors';
import {getSummaryData, getTaskList, updateTaskStatus} from '../actions/adminActions';
import ConfirmDialog from './ConfirmDialog';

const TaskList = ({isSummary}) => {

    const taskListLoading = useSelector(selectTaskListLoading);
    const taskList = useSelector(selectTaskList);
    const taskCount = useSelector(selectTaskCount);
    const filterAndSortOption = useSelector(selectTaskFilterAndSortOption);
    const {
        sortBy,
        sortDirection,
        page,
        pageSize
    } = filterAndSortOption;

    const [dialogState, setDialogState] = useState({
        isOpen: false,
        title: '',
        content: '',
        onConfirm: () => {
        }
    })

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getTaskList(filterAndSortOption));
        }
    }, [user]);

    const handleCloseDialog = () => {
        setDialogState({
            ...dialogState,
            isOpen: false
        })
    }
    const handleSortingOptionChange = (sortField) => () => {
        if (sortField === sortBy) {
            dispatch(getTaskList({
                    ...filterAndSortOption,
                    sortDirection: sortDirection === 'asc' ? 'desc' : 'asc'
                }
            ));
        } else {
            dispatch(getTaskList({
                    ...filterAndSortOption,
                    sortBy: sortField,
                    sortDirection: 'asc'
                })
            )
        }
    }

    const handlePageChange = (event, newPage) => {
        dispatch(getTaskList({
            ...filterAndSortOption,
            page: newPage + 1
        }));
    }

    const handlePageSizeChange = (event) => {
        dispatch(getTaskList({
            ...filterAndSortOption,
            pageSize: parseInt(event.target.value, 10),
            page: 1
        }));
    }

    const handleApprove = (task) => () => {
        dispatch(updateTaskStatus(
            {
                ...task,
                status: 'Approved'
            },
            () => {
                getTaskList(filterAndSortOption);
                getSummaryData();
            }
        ))
    }

    const handleDecline = (task) => () => {
        dispatch(updateTaskStatus(
            {
                ...task,
                status: 'Declined',
            },
            () => {
                getTaskList(filterAndSortOption);
                getSummaryData();
            }
        ))
    }

    const onApproveClick = (currentTask) => () => {
        setDialogState({
            isOpen: true,
            title: 'Are you sure you want to approve this submission?',
            content: 'After being approved, this license plate will be registered into ' +
                'Inter Galactic database and cannot be changed. Please review carefully! ',
            onConfirm: handleApprove(currentTask)
        })
    }

    const onDeclineClick = (currentTask) => () => {
        setDialogState({
            isOpen: true,
            title: 'Are you sure you want to decline this submission?',
            content: 'Declined submission will still be saved as evidence for civil misconducts.',
            onConfirm: handleDecline(currentTask)
        })
    }

    const onDeleteClick = (currentTask) => () => {
        setDialogState({
            isOpen: true,
            title: 'Are you sure you want to delete this submission?',
            content: 'Terminated submission will disappear forever. Don\'t worry,' +
                ' you can still make them submit another request.',
            onConfirm: (currentTask) => () => {
            }
        })
    }

    const columns = TaskTableColumns(onApproveClick, onDeclineClick, onDeleteClick);
    return (
        <>
            <Container maxWidth="md">
                <GenericTable
                    isLoading={taskListLoading}
                    isSummary={isSummary}
                    rows={taskList}
                    totalRowCounts={taskCount}
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

export default TaskList;