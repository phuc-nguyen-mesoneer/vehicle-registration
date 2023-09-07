import {Box, Button, IconButton, Tooltip} from '@mui/material';
import {ArrowCircleDown, ArrowCircleUp, Delete} from '@mui/icons-material';
import ranks from '../utils/ranks.json';

export default (user, onPromoteUser, onDemoteUser, onDeleteUser) => [
    {
        id: 1,
        header: 'Name',
        accessor: 'name',
        isSortable: true
    },
    {
        id: 2,
        header: 'Email',
        accessor: 'email',
        isSortable: true
    },
    {
        id: 3,
        header: 'Role',
        accessor: 'role',
        isSortable: true
    },
    {
        id: 4,
        header: 'Action',
        isSortable: false,
        customHeaderStyle: {textAlign: 'center'},
        customStyle: {textAlign: 'center'},
        customRenderer: (row) => (
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
            >
                {
                    ranks[user.role] > ranks[row.role] &&
                    <Tooltip title="Promote">
                        <IconButton color="success" onClick={onPromoteUser(row)}>
                            <ArrowCircleUp/>
                        </IconButton>
                    </Tooltip>
                }
                {
                    ranks[row.role] > 0 &&
                    <Tooltip title="Demote">
                        <IconButton color="warning" onClick={onDemoteUser(row)}>
                            <ArrowCircleDown/>
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={onDeleteUser(row)}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
            </Box>
        )
    }
];