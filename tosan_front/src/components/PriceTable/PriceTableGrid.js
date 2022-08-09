import * as React from 'react';
import {useDemoData} from '@mui/x-data-grid-generator';
import {
    DataGridPro,
    useGridApiRef,
    SortGridMenuItems,
} from '@mui/x-data-grid-pro';
import {Box, Stack, TablePagination, Typography} from "@mui/material";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {faIR as gridLocale, GridColumnMenuContainer, GridFilterMenuItem} from '@mui/x-data-grid-pro';
import {toFarsiNumberMix, toFarsiNumberE, useProductFromURL} from "../../utils";
import {useSelector} from "react-redux";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import _ from "lodash"

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
    // if needed 3 state add third symbol, and third state for condition
    const currentPrice = props.value
    const lastPrice = props.row['lastPrice']
    let changeState = 0
    if (currentPrice === 0){
        changeState = 0
    } else if (currentPrice > lastPrice) {
        changeState = 1
    } else if (currentPrice < lastPrice) {
        changeState = -1
    }
    return (
        <Stack direction={"row"} sx={{
            width: '100%',
            justifyContent: 'space-between'
        }}>
            <Typography
                variant={'regularX'}
                marginRight={1}
                sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    ...(changeState !== 0 && {
                        color: changeState === 1 ? '#007231' : '#9C0000'
                    }),
                }}
            >
                {
                    currentPrice === 0
                        ?
                        'تماس بگیرید'
                        :
                    toFarsiNumberE(currentPrice, true)
                }
            </Typography>
            {
                changeState === 1 &&
                <ExpandLessIcon sx={{
                    color: '#007231',
                    width: '30px',
                    marginRight: 1,
                }}/>
            }
            {
                changeState === 0 &&
                <Box sx={{
                    width: '30px',
                    marginRight: 1,
                }}></Box>
            }
            {
                changeState === -1 &&
                <ExpandMoreIcon sx={{
                    color: '#9C0000',
                    width: '30px',
                    marginRight: 1,
                }}/>
            }
        </Stack>
    )
}

// const CustomPagination = (props) => {
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

const getColumns = (raw_data, product) => {
    //field, type, headerName,
    let attrs = _.chain(raw_data).map(data => data.attrs_vals).value()
    let merged = _.mergeWith({}, ...attrs, (objVal, srcVal) => {
        return _.isUndefined(objVal) ? [srcVal] : [...objVal, srcVal]
    })
    let columns = _.map(merged, (value, key) => {
        const type = _.some(value, isNaN) ? 'string' : 'number'
        return {
            field: key,
            type: type,
            valueGetter: ({value}) => {
                if (type === 'number') {
                    return parseFloat(value)
                } else {
                    return value
                }
            },
        }
    })
    columns = _.sortBy(columns, (column => {
        return product.attr_vals[column.field][0].priority
    }))
    columns.push({
        field: 'price',
        headerName: 'قیمت (ریال)',
        type: 'number',
        valueGetter: ({value}) => parseFloat(value)
    })
    return columns
}

const getRows = (raw_data) => {
    let rows = _.map(raw_data, (data, index) => {
        return {
            ...data.attrs_vals,
            'price': data.offer_price,
            'lastPrice': data.last_day_price,
            id: index,
        }
    })
    return rows
}

export default forwardRef(function PriceTableGrid({raw_data, scroll, loading = false}, ref) {
    const rowHeight = 46
    const scrollHeightMult = 10
    const pageSizes = [7, 14]
    // const {data} = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 60,
    //     maxColumns: 10,
    // });
    // let columns = data.columns
    // let rows = data.rows
    let columns = null
    let rows = null

    const [page, setPage] = useState(0);
    const quickFilterInput = useSelector(store => store.filter.quickFilterInput)
    const apiRef = useGridApiRef();
    const [pageSize, setPageSize] = useState(pageSizes[0]);
    const all_products = useSelector(store => store.app ? store.app.all_products : [])
    const product = useMemo(() => {
        const someRawData = raw_data[0]
        return all_products.find(product => product.main_name === someRawData.product_name &&
            product.sub_name1 === someRawData.product_sub_name &&
            product.full_name === someRawData.display_name)
    }, [raw_data]);
    columns = useMemo(() => {
        return getColumns(raw_data, product)
    }, [raw_data, product])
    rows = useMemo(() => {
        return getRows(raw_data)
    }, [raw_data]);

    // add renderers
    columns = useMemo(() => (
        columns.map(column => ({
            ...column,
            renderHeader: (props) => {
                return (
                    <Typography variant={'medium'} color={'grey.shade4'}>
                        {props.colDef.headerName ? props.colDef.headerName : props.field}
                    </Typography>
                )
            },
            ...(column.field === 'price' ? {
                    renderCell: PriceCell,
                } : {
                    renderCell: (props) => {
                        return (
                            <Typography variant={'regularX'} color={'grey.shade4'}>
                                {
                                    props.colDef.type === 'string'
                                        ?
                                        toFarsiNumberMix(String(props.value))
                                        :
                                        toFarsiNumberE(String(props.value), true)
                                }
                            </Typography>
                        )
                    }
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

    return (
        <Stack sx={{
            ...(scroll && {
                height: rowHeight * scrollHeightMult,
            }),
        }}>
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
                // loading={data.rows.length === 0}
                loading={loading}

                disableSelectionOnClick
                disableColumnResize
                disableColumnPinning
                disableColumnSelector
                disableColumnReorder

                rowHeight={rowHeight}
                headerHeight={rowHeight}
                autoHeight={!scroll}

                rowsPerPageOptions={pageSizes}
                pagination={!scroll}
                pageSize={pageSize}
                page={page}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}

                localeText={{
                    ...gridLocale.components.MuiDataGrid.defaultProps.localeText,
                    MuiTablePagination: {
                        ...gridLocale.components.MuiDataGrid.defaultProps.localeText.MuiTablePagination,
                        labelDisplayedRows: ({from, to, count}) =>
                            `${toFarsiNumberE(from)} - ${toFarsiNumberE(to)} از ${toFarsiNumberE(count)}`,
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
                initialState={{
                    ...(columns && {
                        sorting: {
                            sortModel: [{ field: columns[0].field, sort: 'asc' }],
                        },
                    })
                }}
            />
        </Stack>
    );
})