import React from 'react';
import {Stack} from "@mui/material";
import PriceTable from "./PriceTable";
import {useSelector} from "react-redux";

const TableWrapper = () => {
    const selectedSplits = useSelector(store => store.filter.checkBoxFilter.split)
    // const all split keys
    // const filtered split keys

    return (
        <Stack spacing={9.5} sx={{
            // width: '100%',
            width: '50%',
        }}>
            {
                [...Array(3).keys()].map((index) => {
                    return (
                        <PriceTable key={index}/>
                    )
                })
            }
        </Stack>
    );
};

export default TableWrapper;
