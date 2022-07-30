import MainSlider from "../components/MainSlider";
import SalesPeople from "../components/SalesPeople";
import CircleImageSlide from "../components/CircleImageSlide";
import SubsidiariesSlideshow from "../components/subsidiariesSlideshow";
import ProductsSlideshow from "../components/productsSlideshow";
import StrengthPoints from "../components/StrengthPoints";

const MainPage = () => (
    <>
        <MainSlider />
        <ProductsSlideshow/>
        <CircleImageSlide/>
        <SalesPeople/>
        <SubsidiariesSlideshow/>
        <StrengthPoints />
    </>
);

export default MainPage;