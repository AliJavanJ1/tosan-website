import * as React from 'react';
import {useDemoData} from '@mui/x-data-grid-generator';
import {
    DataGridPro,
    useGridApiRef,
    SortGridMenuItems,
} from '@mui/x-data-grid-pro';
import {Stack} from "@mui/material";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {faIR as gridLocale, GridColumnMenuContainer, GridFilterMenuItem} from '@mui/x-data-grid-pro';
import {toFarsiNumber} from "../../utils";
import {useSelector} from "react-redux";

const GridColumnMenu = forwardRef((props, ref) => {
    const {hideMenu, currentColumn} = props;
    return (
        <GridColumnMenuContainer ref={ref} {...props}>
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn}/>
            <SortGridMenuItems onClick={hideMenu} column={currentColumn}/>
        </GridColumnMenuContainer>
    );
});

// const HeaderSeparator = () => {
//     return (
//         <></>
//     )
// }

export default forwardRef(function PriceTableGrid({raw_data}, ref) {
    const pageSizes = [7]
    const rowHeight = 46
    const {data} = useDemoData({
        dataSet: 'Commodity',
        rowLength: 60,
        maxColumns: 6,
    });

    const quickFilterInput = useSelector(store => store.filter.quickFilterInput)
    const apiRef = useGridApiRef();
    const [pageSize, setPageSize] = useState(pageSizes[0]);
    const columns = useMemo(() => {
        return (
            data.columns.map(({width, ...column}) => (
                {
                    ...column,
                    align: 'center',
                    headerAlign: 'center',
                    flex: 1,
                }
            ))
        )
    }, [data.columns])

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
    // console.log(data.initialState)

    return (
        <Stack sx={{
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
                rows={data.rows}
                columns={columns}
                // initialState={data.initialState} // hide is true in column itself
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
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

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
                    // Toolbar: GridToolbar,
                }}
            />
        </Stack>
    );
})