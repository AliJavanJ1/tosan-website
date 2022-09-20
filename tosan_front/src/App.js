import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CacheProvider} from "@emotion/react";
import {prefixer} from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import {useEffect} from "react";
import {fetchAppData} from "./redux/appSlice";
import {LinkBehavior} from "./components/linkBehavior"
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import Header from "./components/header";
import {LicenseInfo} from '@mui/x-license-pro';
import ProductsPage from "./pages/ProductsPage";
import {fetchPriceData} from "./redux/priceSlice";
import WordPressPage from "./pages/WordPressPage";
import ScrollToTop from "./components/ScrollToTop";

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
        direction: 'rtl',
        palette: {
            primary: {
                main: `#7f8d9e`,
                shade1: `#7f8d9e`,
                shade2: `#495C74`,
                shade3: `#334964`,
                shade4: `#001b3e`,
            },
            secondary: {
                main: `#D8CE9D`,
                shade1: `#D8CE9D`,
                shade2: `#D3C68B`,
                shade3: `#CDBE78`,
            },
            grey: {
                main: `#383838`,
                shade1: `#c2c7ce`,
                shade2: `#c4c4c4`,
                shade3: `#888888`,
                shade4: `#383838`,
                shade5: `#000000`,
            },
            white: {
                main: `#f2f2f2`,
                shade1: `#f2f2f2`,
                shade2: `#f7f7f7`,
                shade3: `#ffffff`,
            }
        },
        typography: {
            fontFamily: 'IRANSansXRegular',
            fontSize: 14,
            extraBoldX: {
                fontFamily: 'IRANSansXExtraBold',
                fontSize: 36,
                lineHeight: "54px",
            },
            extraBold: {
                fontFamily: 'IRANSansXExtraBold',
                fontSize: 28,
                lineHeight: "42px",
            },
            bold: {
                fontFamily: 'IRANSansXBold',
                fontSize: 24,
                lineHeight: "36px",
            },
            boldS: {
                fontFamily: 'IRANSansXBold',
                fontSize: 18,
                lineHeight: "27px",
            },
            demiBoldX: {
                fontFamily: 'IRANSansXDemiBold',
                fontSize: 18,
                lineHeight: "27px",
            },
            demiBold: {
                fontFamily: 'IRANSansXDemiBold',
                fontSize: 16,
                lineHeight: "24px",
            },
            demiBoldS: {
                fontFamily: 'IRANSansXDemiBold',
                fontSize: 14,
                lineHeight: "21px",
            },
            mediumS: {
                fontFamily: 'IRANSansXMedium',
                fontSize: 14,
                lineHeight: "21px",
            },
            medium: {
                fontFamily: 'IRANSansXMedium',
                fontSize: 16,
                lineHeight: "24px",
            },
            mediumX: {
                fontFamily: 'IRANSansXMedium',
                fontSize: 16,
                lineHeight: "28px",
            },
            regularX: {
                fontFamily: 'IRANSansXRegular',
                fontSize: 16,
                lineHeight: "24px",
            },
            regular: {
                fontFamily: 'IRANSansXRegular',
                fontSize: 14,
                lineHeight: "21px",
            },
            regularS: {
                fontFamily: 'IRANSansXRegular',
                fontSize: 12,
                lineHeight: "18px",
            }
        },
        components: {
            MuiLink: {
                defaultProps: {
                    component: LinkBehavior,
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                },
            },
        },
    },
);

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAppData())
        dispatch(fetchPriceData())
    }, [dispatch])

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <ScrollToTop/>
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<MainPage/>}/>
                        <Route path='/products/:fullname/:sub1/:main' element={<ProductsPage />} />
                        <Route path={'/about-us'} element={<WordPressPage wpPath="/about-us" />}/>
                        <Route path={'/contact-us'} element={<WordPressPage wpPath="/contact-us" />}/>
                        <Route path={'/downloads'} element={<WordPressPage wpPath="/downloads" />}/>
                        <Route path={'/gallery'} element={<WordPressPage wpPath="/gallery" />}/>
                        <Route path={'/blog'} element={<WordPressPage wpPath="/blog" />}/>
                        <Route path={'/job-offers'} element={<WordPressPage wpPath="/jobs" />}/>
                        <Route path={'/events'} element={<WordPressPage wpPath="/events" />}/>
                        <Route path={'/:name'} element={<WordPressPage wpPath={"/"} />}/>
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
