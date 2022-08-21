import MainSlider from "../components/MainSlider";
import SalesPeople from "../components/SalesPeople";
import CircleImageSlide from "../components/CircleImageSlide";
import SubsidiariesSlideshow from "../components/subsidiariesSlideshow";
import ProductsSlideshow from "../components/productsSlideshow";
import StrengthPoints from "../components/StrengthPoints";
import QuickSearch from "../components/QuickSearch";
import {useEffect} from "react";
import WordPressPage from "./WordPressPage";

const MainPage = () => {
        useEffect(() => {
                document.title = "گروه شرکت‌های توسن"
        }, []);
        return (
            <>
                <MainSlider/>
                <ProductsSlideshow/>
                <QuickSearch/>
                <CircleImageSlide/>
                <SalesPeople/>
                <SubsidiariesSlideshow/>
                {/*<WordPressPage*/}
                {/*    wpPath="/%d8%a7%d8%b3%d9%84%d8%a7%db%8c%d8%af%d8%b1-%d9%85%d9%82%d8%a7%d9%84%d8%a7%d8%aa"*/}
                {/*    preHeight="490px"*/}
                {/*    sx={{ marginBottom: 10 }}*/}
                {/*/>*/}
                <StrengthPoints/>
            </>
        )
    }
;

export default MainPage;