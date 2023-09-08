import {styled} from '@mui/material/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    TablePagination,
    TableFooter,
    tableCellClasses,
    tableSortLabelClasses
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    }
}));

const StyledTableSortLabel = styled(TableSortLabel)(({theme}) => ({
    [`&.${tableSortLabelClasses.active}`]: {
        color: theme.palette.common.white
    }
}))

const GenericTable = (
    {
        isSummary,
        totalRowCounts,
        rows,
        columns,
        sortBy,
        sortDirection,
        onSortingOptionChange,
        page,
        onPageChange,
        pageSize,
        onPageSizeChange
    }
) => {

    const renderedRows = isSummary ? rows.slice(0, 3) : rows;

    return (
        <>
            <TableContainer sx={{
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                boxShadow: 1
            }}>
                <Table size="medium" sx={{whiteSpace: 'nowrap'}}>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(column => (
                                    column.isSortable && !isSummary ?
                                        <StyledTableCell
                                            key={column.id}
                                            sx={column.customHeaderStyle ? column.customHeaderStyle : {}}
                                        >
                                            <StyledTableSortLabel
                                                active={sortBy === column.accessor}
                                                direction={sortBy === column.accessor ? sortDirection : 'asc'}
                                                onClick={onSortingOptionChange(column.accessor)}
                                            >
                                                {column.header}
                                            </StyledTableSortLabel>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell
                                            key={column.id}
                                            sx={column.customHeaderStyle ? column.customHeaderStyle : {}}
                                        >
                                            {column.header}
                                        </StyledTableCell>

                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            renderedRows.map(row => (
                                <TableRow key={row._id}>
                                    {
                                        columns.map(column => (
                                            <TableCell
                                                key={column.id}
                                                sx={column.customStyle ? column.customStyle : {}}
                                            >
                                                {
                                                    column.accessor ?
                                                        row[column.accessor]
                                                        :
                                                        column.customRenderer(row)
                                                }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                !isSummary &&
                <TablePagination
                    component="div"
                    count={totalRowCounts}
                    page={page - 1}
                    rowsPerPage={pageSize}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onPageSizeChange}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                />
            }
        </>
    )
}

export default GenericTable;