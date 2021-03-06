import React, {Fragment, useState} from 'react';
import { useTable, useSortBy, useFilters, useExpanded, usePagination } from "react-table"
import { Filter, DefaultColumnFilter } from './components/filters';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import {requestScalesData} from "./utils/ScalesData";


const TableContainer = ({ columns, renderRowSubComponent }) => {
    const [ currentData, setCurrentData ] = useState([]);
    const [ pages, setPages ] = useState(0);
    const [ sorted, setSorted] = useState([{id: "created_at", desc: true}]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },

    } = useTable({
        columns,
        data: currentData,
        pages: pages,
        manualPagination: true,
            pageCount: 20,
        defaultColumn: { Filter: DefaultColumnFilter},
        initialState: { pageIndex: 0, pageSize: 10 }
    },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    );

    React.useEffect(() => {
        let filtered = [];

        console.log("pageSize:",pageSize)
        console.log("pageIndex:",pageIndex)
        debugger

        requestScalesData(pageSize, pageIndex, sorted, filtered).then(res => {
            setCurrentData(res.rows)
        })
    }, [pageIndex, pageSize])


    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? <IconButton><ExpandMoreIcon /></IconButton> : <IconButton><ExpandLessIcon /></IconButton> ) : '';
    };

    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
    };

    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };

    return (
        <Fragment>
        <Table bordered hover {...getTableProps()}>
            <TableHead>
            {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <TableCell {...column.getHeaderProps()}>
                            <div {...column.getSortByToggleProps()}>
                                {column.render('Header')}
                                {generateSortingIndicator(column)}
                            </div>
                            <Filter column={column} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
            </TableHead>

            <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row);
                return (
                    <Fragment key={row.getRowProps().key}>
                        <TableRow>
                            {row.cells.map((cell) => {
                                return (
                                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                );
                            })}
                        </TableRow>
                        {row.isExpanded && (
                            <TableRow>
                                <TableCell colSpan={visibleColumns.length}>
                                    {renderRowSubComponent(row)}
                                </TableCell>
                            </TableRow>
                        )}
                    </Fragment>
                );
            })}
            </TableBody>
        </Table>
            <Box display="flex" style={{ maxWidth: "100%", marginTop: "3%", marginBottom: "1%", textAlign: 'center' }}>
                <Box md={3}>
                    <Button
                        color='primary'
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'}
                    </Button>
                    <Button
                        color='primary'
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        {'<'}
                    </Button>
                </Box>
                <Box md={2} style={{ marginTop: 7, marginLeft: "15%" }}>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </Box>
                <Box style={{marginLeft: "10%"}} md={1}>
                    <Input
                        type='number'
                        min={1}
                        style={{ width: 70 }}
                        max={pageOptions.length}
                        defaultValue={pageIndex + 1}
                        onChange={onChangeInInput}
                    />
                </Box>
                <Box style={{marginLeft: "10%"}} md={2}>
                    <Input
                        type='number'
                        value={pageSize}
                        onChange={onChangeInSelect}
                    >
                        >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Input>
                </Box>
                <Box style={{marginLeft: "15%"}} md={3}>
                    <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
};

export default TableContainer;