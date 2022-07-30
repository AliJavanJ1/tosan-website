import MainSlider from "../components/MainSlider";
import SalesPeople from "../components/SalesPeople";
import CircleImageSlide from "../components/CircleImageSlide";
import SubsidiariesSlideshow from "../components/subsidiariesSlideshow";
import ProductsSlideshow from "../components/productsSlideshow";
import StrengthPoints from "../components/StrengthPoints";
import {Stack} from "@mui/material";
import FiltersSidebar from "../components/FiltersSidebar";
import TableWrapper from "../components/PriceTable/TableWrapper";

const MainPage = () => (
    <>
        {/*<MainSlider />*/}
        {/*<ProductsSlideshow/>*/}
        {/*<CircleImageSlide/>*/}
        {/*<SalesPeople/>*/}
        {/*<SubsidiariesSlideshow/>*/}
        {/*<StrengthPoints />*/}
        <Stack direction={'row'} justifyContent={'space-around'} sx={{
            padding: '30px',
        }}>
            <FiltersSidebar/>
            <TableWrapper/>
        </Stack>
    </>
);

export default MainPage;