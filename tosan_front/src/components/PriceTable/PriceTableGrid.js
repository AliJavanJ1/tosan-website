import * as React from 'react';
import {useDemoData} from '@mui/x-data-grid-generator';
import {DataGridPro, useGridApiRef, SortGridMenuItems} from '@mui/x-data-grid-pro';
import {Stack, styled} from "@mui/material";
import {forwardRef, useCallback, useEffect, useMemo, useState} from "react";
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

export default function PriceTableGrid({raw_data}) {
    const pageSizes = [7]
    const rowHeight = 46
    const {data} = useDemoData({
        dataSet: 'Commodity',
        rowLength: 200,
        // maxColumns: 6,
    });

    const quickFilterInput = useSelector(store => store.filter.quickFilterInput)
    console.log(quickFilterInput)
    const apiRef = useGridApiRef();
    const [pageSize, setPageSize] = useState(pageSizes[0]);
    const columns = useMemo(() => {
        return (
            data.columns.map((column) => (
                {
                    ...column,
                    align: 'center',
                    headerAlign: 'center',
                }
            ))
        )
    }, [data.columns])

    useEffect(() => {
        if (apiRef.current) {
            let values = quickFilterInput.split(' ').filter((word) => word !== '');
            apiRef.current.setQuickFilterValues(values)
        }
    }, [quickFilterInput, apiRef])

    console.log(columns)
    return (
        <Stack sx={{
            // height: '381px',
            width: '1000px',
        }}>
            <DataGridPro
                dir={'ltr'}
                sx={{
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
                    //ltr
                    '& .MuiDataGrid-columnsContainer': {
                        direction: 'ltr'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        direction: 'ltr',
                    }
                }}
                {...data}
                columns={columns}
                loading={data.rows.length === 0}
                rowHeight={rowHeight}
                disableSelectionOnClick
                autoHeight
                rowsPerPageOptions={pageSizes}
                disableColumnReorder={true}
                apiRef={apiRef}
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
                headerHeight={rowHeight}
                disableColumnResize={true}
                components={{
                    // ColumnResizeIcon: HeaderSeparator,
                    ColumnMenu: GridColumnMenu,
                }}
                disableColumnPinning
                disableColumnSelector
            />
        </Stack>
    );
}