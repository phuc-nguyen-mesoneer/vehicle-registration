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
import {useEffect} from 'react';
import {selectUser} from '../selectors/authSelectors';
import {getTaskList} from '../actions/adminActions';

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

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getTaskList(filterAndSortOption));
        }
    }, [user]);

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

    return (
        <Container maxWidth="md">
            <GenericTable
                isLoading={taskListLoading}
                isSummary={isSummary}
                rows={taskList}
                totalRowCounts={taskCount}
                columns={TaskTableColumns}
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

export default TaskList;