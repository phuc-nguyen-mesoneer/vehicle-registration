import moment from 'moment';

import {
    Box,
    Tooltip
} from '@mui/material';
import {
    CancelOutlined,
    CheckCircleOutlined,
    Female,
    Male,
    Transgender
} from '@mui/icons-material';

export default [
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
                    <CheckCircleOutlined color="success"/>
                </Tooltip>
                <Box p={1}/>
                <Tooltip title="Decline">
                    <CancelOutlined color="error"/>
                </Tooltip>
            </Box>
        ),
        isSortable: false
    },
    {
        id: 1,
        header: 'First Name',
        accessor: 'firstName',
        isSortable: true
    },
    {
        id: 2,
        header: 'Last Name',
        accessor: 'lastName',
        isSortable: true
    },
    {
        id: 3,
        header: 'Birthday',
        customHeaderStyle: {textAlign: 'center'},
        customRenderer: (row) => moment(row.dateOfBirth).format('MMM DD YYYY'),
        isSortable: true
    },
    {
        id: 4,
        header: 'Email',
        accessor: 'email',
        isSortable: true
    },
    {
        id: 5,
        header: 'ID number',
        accessor: 'idNumber',
        isSortable: true,
        customHeaderStyle: {textAlign: 'right'},
        customStyle: {textAlign: 'right'},
    },
    {
        id: 6,
        header: 'Brand',
        accessor: 'brand',
        isSortable: true
    },
    {
        id: 7,
        header: 'Model',
        accessor: 'model',
        isSortable: true
    },
    {
        id: 8,
        header: 'Province',
        accessor: 'province',
        isSortable: true
    },
    {
        id: 9,
        header: 'Address',
        accessor: 'address',
        isSortable: false
    },
    {
        id: 10,
        header: 'Phone Number',
        accessor: 'phoneNumber',
        isSortable: false,
        customHeaderStyle: {textAlign: 'right'},
        customStyle: {textAlign: 'right'},
    },
    {
        id: 11,
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
    },
    {
        id: 12,
        header: 'Plate Number',
        accessor: 'plate',
        isSortable: true,
        customHeaderStyle: {textAlign: 'right'},
        customStyle: {textAlign: 'right'},
    }
]