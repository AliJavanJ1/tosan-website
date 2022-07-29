import * as React from 'react';
import {
    GridLinkOperator, useGridApiContext, GridAddIcon, GridPanelContent, GridPanelFooter,
    GridPanelWrapper,
    GridFilterForm,
    useGridRootProps, useGridSelector, gridFilterModelSelector, gridFilterableColumnDefinitionsSelector
} from '@mui/x-data-grid-pro'

const AdvancedFilter = React.forwardRef(
    function GridFilterPanel(props, ref) {
        const apiRef = useGridApiContext(); //different every table
        const rootProps = useGridRootProps(); //different every table
        const filterModel = useGridSelector(apiRef, gridFilterModelSelector); //different every table //from redux
        const filterableColumns = useGridSelector(apiRef, gridFilterableColumnDefinitionsSelector); // same every table //from redux
        const lastFilterRef = React.useRef(null);

        const {
            linkOperators = [GridLinkOperator.And, GridLinkOperator.Or],
            columnsSort,
            filterFormProps,
            children,
            ...other
        } = props;

        // apply filter items to grid
        const applyFilter = React.useCallback(
            (item) => {
                apiRef.current.upsertFilterItem(item);
            },
            [apiRef],
        );

        // set link operator to grid
        const applyFilterLinkOperator = React.useCallback(
            (operator) => {
                apiRef.current.setFilterLinkOperator(operator);
            },
            [apiRef],
        );

        // a new filter default values
        const getDefaultItem = React.useCallback(() => {
            const firstColumnWithOperator = filterableColumns.find(
                (colDef) => colDef.filterOperators?.length,
            );

            if (!firstColumnWithOperator) {
                return null;
            }

            return {
                columnField: firstColumnWithOperator.field,
                operatorValue: firstColumnWithOperator.filterOperators[0].value,
                id: Math.round(Math.random() * 1e5),
            };
        }, [filterableColumns]);

        // current items of panel
        const items = React.useMemo(() => {
            if (filterModel.items.length) {
                return filterModel.items;
            }

            const defaultItem = getDefaultItem();

            return defaultItem ? [defaultItem] : [];
        }, [filterModel.items, getDefaultItem]);

        const hasMultipleFilters = items.length > 1;

        // on click add new filter
        const addNewFilter = () => {
            const defaultItem = getDefaultItem();
            if (!defaultItem) {
                return;
            }
            apiRef.current.upsertFilterItems([...items, defaultItem]);
        };

        // delete callback passed to form
        const deleteFilter = React.useCallback(
            (item) => {
                const shouldCloseFilterPanel = items.length === 1;
                apiRef.current.deleteFilterItem(item);
                if (shouldCloseFilterPanel) {
                    apiRef.current.hideFilterPanel();
                }
            },
            [apiRef, items.length],
        );

        // fix grids default linkOperator(filterModel.linkOperator) if it's not in supported linkOperators
        React.useEffect(() => {
            if (
                linkOperators.length > 0 &&
                filterModel.linkOperator &&
                !linkOperators.includes(filterModel.linkOperator)
            ) {
                applyFilterLinkOperator(linkOperators[0]);
            }
        }, [linkOperators, applyFilterLinkOperator, filterModel.linkOperator]);

        // focus last filter on len change
        React.useEffect(() => {
            if (items.length > 0) {
                lastFilterRef.current.focus();
            }
        }, [items.length]);

        return (
            <GridPanelWrapper ref={ref} {...other}>
                <GridPanelContent>
                    {items.map((item, index) => (
                        <GridFilterForm
                            key={item.id == null ? index : item.id}
                            item={item}
                            applyFilterChanges={applyFilter}
                            deleteFilter={deleteFilter}
                            hasMultipleFilters={hasMultipleFilters}
                            showMultiFilterOperators={index > 0}
                            multiFilterOperator={filterModel.linkOperator}
                            disableMultiFilterOperator={index !== 1}
                            applyMultiFilterOperatorChanges={applyFilterLinkOperator}
                            focusElementRef={index === items.length - 1 ? lastFilterRef : null}
                            linkOperators={linkOperators}
                            columnsSort={columnsSort}
                            {...filterFormProps}
                        />
                    ))}
                </GridPanelContent>
                {!rootProps.disableMultipleColumnsFiltering && (
                    <GridPanelFooter>
                        <rootProps.components.BaseButton
                            onClick={addNewFilter}
                            startIcon={<GridAddIcon/>}
                            {...rootProps.componentsProps?.baseButton}
                        >
                            {apiRef.current.getLocaleText('filterPanelAddFilter')}
                        </rootProps.components.BaseButton>
                    </GridPanelFooter>
                )}
            </GridPanelWrapper>
        );
    },
);


export {AdvancedFilter};