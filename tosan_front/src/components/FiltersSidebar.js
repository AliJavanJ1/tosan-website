import React from 'react';
import {Stack} from "@mui/material";
import PriceTableQuickFilter from "./PriceTable/PriceTableQuickFilter";

const FiltersSidebar = () => {
    return (
        <Stack sx={{
            bgcolor: 'white.shade2',
        }}>
            <PriceTableQuickFilter/>
        </Stack>
    );
};

export default FiltersSidebar;
