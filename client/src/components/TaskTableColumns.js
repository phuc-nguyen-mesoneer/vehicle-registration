import moment from 'moment';

import {
    Box, IconButton,
    Tooltip
} from '@mui/material';
import {
    CancelOutlined,
    CheckCircleOutlined, Delete,
    Female,
    Male,
    Transgender
} from '@mui/icons-material';

export default (onApprove, onDecline, onDelete) => [
    {
        id: 0,
        header: 'Action',
        customHeaderStyle: {textAlign: 'center'},
        customRenderer: (row) => (
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <Tooltip title="Approve">
                    <IconButton color="success" onClick={onApprove(row)}>
                        <CheckCircleOutlined />
                    </IconButton>
                </Tooltip>
                <Box p={1}/>
                <Tooltip title="Decline">
                    <IconButton color="warning" onClick={onDecline(row)}>
                        <CancelOutlined/>
                    </IconButton>
                </Tooltip>
                <Box p={1}/>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={onDelete(row)}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        isSortable: false
    },
    {
        id: 1,
        header: 'Plate Number',
        accessor: 'plate',
        isSortable: false,
        customHeaderStyle: {textAlign: 'right'},
        customStyle: {textAlign: 'right'}
    },
    {
        id: 2,
        header: 'First Name',
        accessor: 'firstName',
        isSortable: true
    },
    {
        id: 3,
        header: 'Last Name',
        accessor: 'lastName',
        isSortable: true
    },
    {
        id: 4,
        header: 'Birthday',
        customHeaderStyle: {textAlign: 'center'},
        customRenderer: (row) => moment(row.dateOfBirth).format('MMM DD YYYY'),
        isSortable: true
    },
    {
        id: 5,
        header: 'Email',
        accessor: 'email',
        isSortable: true
    },
    {
        id: 6,
        header: 'ID number',
        accessor: 'idNumber',
        isSortable: true,
        customHeaderStyle: {textAlign: 'right'},
        customStyle: {textAlign: 'right'}
    },
    {
        id: 7,
        header: 'Brand',
        accessor: 'brand',
        isSortable: true
    },
    {
        id: 8,
        header: 'Model',
        accessor: 'model',
        isSortable: true
    },
    {
        id: 9,
        header: 'Province',
        accessor: 'province',
        isSortable: true
    },
    {
        id: 10,
        header: 'Address',
        accessor: 'address',
        isSortable: false
    },
    {
        id: 11,
        header: 'Phone Number',
        accessor: 'phoneNumber',
        isSortable: false,
        customHeaderStyle: {textAlign: 'right'},
        customStyle: {textAlign: 'right'}
    },
    {
        id: 12,
        header: 'Gender',
        customRenderer: row => {
            switch (row.gender) {
                case 'male':
                    return <Male color="primary"/>;
                case 'female':
                    return <Female color="secondary"/>;
                default:
                    return <Transgender color="error"/>;
            }
        },
        customHeaderStyle: {textAlign: 'center'},
        customStyle: {textAlign: 'center'},
        isSortable: false
    }
]