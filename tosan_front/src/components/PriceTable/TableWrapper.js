import React from 'react';
import {Stack} from "@mui/material";
import PriceTable from "./PriceTable";

const TableWrapper = () => {
    return (
        <Stack>
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
