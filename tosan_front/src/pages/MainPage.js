import Header from "../components/header";
import MainSlider from "../components/MainSlider";
import SalesPeople from "../components/SalesPeople";
import CircleImageSlide from "../components/CircleImageSlide";
import SubsidiariesSlideshow from "../components/subsidiariesSlideshow";
import ProductsSlideshow from "../components/productsSlideshow";

const MainPage = () => (
    <>
        <MainSlider />
        <ProductsSlideshow/>
        <CircleImageSlide/>
        <SalesPeople/>
        <SubsidiariesSlideshow/>
    </>
);

export default MainPage;