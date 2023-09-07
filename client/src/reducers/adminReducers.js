import {
    SET_TASKS,
    SET_TASKS_LOADING,
    SET_TASK_FILTER_AND_SORT_OPTION,
    SET_USER_FILTER_AND_SORT_OPTION,
    SET_USERS,
    SET_USERS_LOADING, GET_USERS_ERROR, SET_SUMMARY_DATA
} from '../actions/types';

const initialState = {
    totalUserCount: 0,
    userList: [],
    userCount: 0,
    userListLoading: false,
    userFilterAndSortOption: {
        page: 1,
        pageSize: 5,
        sortBy: '',
        sortDirection: 'asc',
        searchKeyword: '',
    },

    totalTaskCount: 0,
    taskList: [],
    taskCount: 0,
    taskListLoading: false,
    taskFilterAndSortOption: {
        page: 1,
        pageSize: 5,
        sortBy: '',
        sortDirection: 'asc',
        searchKeyword: '',
    }
}

export default function (state=initialState, action) {
    switch (action.type) {
        case SET_SUMMARY_DATA:
            return {
                ...state,
                ...action.payload,
            }

        case SET_USERS_LOADING:
            return {
                ...state,
                userListLoading: true,
            };

        case SET_USERS:
            return {
                ...state,
                userListLoading: false,
                ...action.payload,
            };

        case GET_USERS_ERROR:
            return {
                ...state,
                userListLoading: false,
            }

        case SET_USER_FILTER_AND_SORT_OPTION:
            return {
                ...state,
                userFilterAndSortOption: {
                    ...state.userFilterAndSortOption,
                    ...action.payload,
                }
            };

        case SET_TASKS_LOADING:
            return {
                ...state,
                taskListLoading: true,
            }

        case SET_TASKS:
            return {
                ...state,
                taskListLoading: false,
                ...action.payload,
            };

        case SET_TASK_FILTER_AND_SORT_OPTION:
            return {
                ...state,
                taskFilterAndSortOption: {
                    ...state.taskFilterAndSortOption,
                    ...action.payload
                }
            };

        default:
            return state;
    }
}