import React from 'react';
import {Stack} from "@mui/material";
import PriceTable from "./PriceTable";
import {useSelector} from "react-redux";

const TableWrapper = () => {
    const selectedSplits = useSelector(store => store.filter.checkBoxFilter.split)
    // const all split keys
    // const filtered split keys

    return (
        <Stack
            boxShadow="1px 3px 12px rgba(0, 0, 0, 0.08)"
            borderRadius="8px"
            rowGap="76px"
            paddingX="15px"
            paddingY="82px"
            sx={{
                backgroundColor: "white.shade3"
            }}
        >
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
