import * as React from 'react';
import {useDemoData} from '@mui/x-data-grid-generator';
import {
    DataGridPro,
    useGridApiRef,
    SortGridMenuItems,
} from '@mui/x-data-grid-pro';
import {Stack, TablePagination, Typography} from "@mui/material";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {faIR as gridLocale, GridColumnMenuContainer, GridFilterMenuItem} from '@mui/x-data-grid-pro';
import {toFarsiNumber} from "../../utils";
import {useSelector} from "react-redux";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GridColumnMenu = forwardRef((props, ref) => {
    const {hideMenu, currentColumn} = props;
    return (
        <GridColumnMenuContainer ref={ref} {...props}>
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn}/>
            <SortGridMenuItems onClick={hideMenu} column={currentColumn}/>
        </GridColumnMenuContainer>
    );
});

const PriceCell = (props) => {
    const condition = Math.floor(props.value) % 2 === 1
    return (
        <Stack direction={"row"} sx={{
            width: '100%',
            justifyContent: 'space-between'
        }}>
            <Typography
                variant={'regularX'}
                color={condition ? '#007231' : '#9C0000'}
                marginRight={1}
                sx={{
                    flexGrow: 1,
                    textAlign: 'center'
                }}
            >
                {props.value}
            </Typography>
            {
                condition
                    ?
                    <ExpandMoreIcon sx={{
                        color: '#007231',
                        width: '30px',
                        marginRight: 1,
                    }}/>
                    :
                    <ExpandLessIcon sx={{
                        color: '#9C0000',
                        width: '30px',
                        marginRight: 1,
                    }}/>
            }
        </Stack>
    )
}

// const CustomPagination = (props) => {
//     console.log(props)
//     return(
//         <TablePagination
//             labelRowsPerPage="Rows per page" // <-- change here for anything you like
//             rowsPerPageOptions={[5, 10, 25, 50, 100]}
//             component="div"
//             // count={count}
//             // rowsPerPage={rowsPerPage}
//             // page={page}
//             // onChangePage={handleChangePage}
//             // onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//     )
// }

// const HeaderSeparator = () => {
//     return (
//         <></>
//     )
// }

export default forwardRef(function PriceTableGrid({raw_data}, ref) {
    const rowHeight = 46
    const {data} = useDemoData({
        dataSet: 'Commodity',
        rowLength: 60,
        maxColumns: 10,
    });
    const pageSizes = [7, 14]
    let columns = data.columns

    const [page, setPage] = useState(0);
    const quickFilterInput = useSelector(store => store.filter.quickFilterInput)
    const apiRef = useGridApiRef();
    const [pageSize, setPageSize] = useState(pageSizes[0]);

    // add renderers
    columns = useMemo(() => (
        columns.map(column => ({
                ...column,
                renderHeader: (props) => (
                    <Typography variant={'medium'} color={'grey.shade4'}>
                        {props.field}
                    </Typography>
                ),
                ...(column.field === 'unitPrice' ? {
                        renderCell: PriceCell,
                    } : {
                        renderCell: (props) => (
                            <Typography variant={'regularX'} color={'grey.shade4'}>
                                {props.value}
                            </Typography>
                        )
                    }
                ),
            }))
    ), [columns.length]);
    // add alignments
    columns = useMemo(() => {
        return (
            columns.map(({width, ...column}) => {
                return ({
                    ...column,
                    align: 'center',
                    headerAlign: 'center',
                    flex: 1,
                })
            })
        )
    }, [columns.length])
    const rows = data.rows

    const onPageSizeChange = (newPageSize) => {
        setPageSize(newPageSize)
        setPage(0)
    }
    const onPageChange = (newPage) => {
        setPage(newPage)
    }

    // const onPageSizeChangeCustom = (e) => {
    //     console.log(e.target.value.newPageSize)
    //     setPageSize(e.target.value.newPageSize)
    //     setPage(0)
    //     // if(isNaN(newPageSize)){
    //     //     setPageSize(rows.length)
    //     // }else{
    //     //     setPageSize(newPageSize)
    //     // }
    // }
    // const onPageChangeCustom = (newPage) => {
    //     setPage(newPage)
    // }

    useEffect(() => {
        if (apiRef.current) {
            let values = quickFilterInput.split(' ').filter((word) => word !== '');
            apiRef.current.setQuickFilterValues(values)

            // apiRef.current.scrollToIndexes({
            //     rowIndex: 0,
            //     colIndex: columns.length-2,
            // })
        }
    }, [quickFilterInput, apiRef, apiRef.current])
    useImperativeHandle(
        ref,
        () => ({
            print(fileName,) {
                apiRef.current.exportDataAsPrint({
                    fileName: fileName,
                    hideFooter: true,
                    pageStyle: `
                        .MuiDataGrid-root {
                            border: 0 !important;
                        }
                    `
                })
            },
            csv(fileName) {
                apiRef.current.exportDataAsCsv({
                    fileName: fileName,
                })
            }
        }),
        [apiRef],
    );

    // console.log(columns)
    // console.log(rows)

    return (
        <Stack sx={{}}>
            <DataGridPro
                apiRef={apiRef}
                sx={{
                    borderRadius: '0px 0px 4px 4px',
                    '& .even': {
                        bgcolor: 'white.shade1',
                    },
                    '& .odd': {
                        bgcolor: 'white.shade3',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 0,
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                        flex: 'initial',
                    },
                    '& .MuiDataGrid-menuIcon': {
                        margin: '0 !important',
                    },
                    '& .MuiDataGrid-columnHeaderDraggableContainer': {
                        justifyContent: 'center'
                    },

                    // '& 	.MuiDataGrid-main': {
                    //     direction: 'rtl',
                    // }
                }}
                rows={rows}
                columns={columns}
                loading={data.rows.length === 0}

                disableSelectionOnClick
                disableColumnResize
                disableColumnPinning
                disableColumnSelector
                disableColumnReorder

                rowHeight={rowHeight}
                headerHeight={rowHeight}
                autoHeight

                rowsPerPageOptions={pageSizes}
                pagination
                pageSize={pageSize}
                page={page}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}

                localeText={{
                    ...gridLocale.components.MuiDataGrid.defaultProps.localeText,
                    MuiTablePagination: {
                        ...gridLocale.components.MuiDataGrid.defaultProps.localeText.MuiTablePagination,
                        labelDisplayedRows: ({from, to, count}) =>
                            `${toFarsiNumber(from)} - ${toFarsiNumber(to)} از ${toFarsiNumber(count)}`,
                    }
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                components={{
                    // ColumnResizeIcon: HeaderSeparator,
                    ColumnMenu: GridColumnMenu,
                    // Pagination: CustomPagination
                }}
                componentsProps={{
                    // pagination: {
                    //     rowsPerPageOptions: pageSizes,
                    //     page: page,
                    //     onPageSizeChange: onPageSizeChangeCustom,
                    //     onPageChange: onPageChangeCustom,
                    // }
                }}
            />
        </Stack>
    );
})