import {Stack, Typography} from "@mui/material";
import SpecialOffer from "../components/SpecialOffer";
import PriceTableQuickFilter from "../components/PriceTable/PriceTableQuickFilter";
import TableWrapper from "../components/PriceTable/TableWrapper";
import OrderRegistrationProcedure from "../components/OrderRegistrationProcedure";
import OrderRegistrationDescriptions from "../components/OrderRegistrationDescriptions";

function ProductsPage() {
    const productsMainCategory = "جدول قیمت میلگرد آجدار"

    return (
        <>
            <Stack // Header
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                    backgroundColor: "primary.shade4",
                    width: "100%",
                    paddingY: 6,
                }}
            >
                <Typography // Main Category Title in Header
                    textAlign="center"
                    variant="extraBold"
                    sx={{
                        color: "secondary.shade3",

                    }}
                >
                    {productsMainCategory}
                </Typography>
            </Stack>
            <Stack direction="row">  {/* Body */}
                <Stack // Side Bar
                    width="259px"
                    paddingTop="52px"
                    paddingLeft="66px"
                    paddingRight="29px"
                    direction="column"
                    flexWrap="nowrap"
                    alignItems="stretch"
                    justifyContent="flex-start"
                    rowGap="20px"
                    sx={{ backgroundColor: "white" }}
                >
                    <PriceTableQuickFilter/>
                    {/*<CheckBoxFilter />*/}
                </Stack>
                <Stack // Main Body Part
                    width="calc(100vw - 354px - 48px)"
                    paddingRight="48px"
                    direction="column"
                    flexWrap="nowrap"
                    alignItems="stretch"
                    justifyContent="flex-start"
                    rowGap="87px"
                    sx={{ backgroundColor: "white.shade3" }}
                >
                    <TableWrapper />
                    <SpecialOffer />
                    <OrderRegistrationProcedure />
                    <OrderRegistrationDescriptions />
                </Stack>
            </Stack>
        </>
    );
}

export default ProductsPage;