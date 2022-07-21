import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import {useDispatch} from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Typography} from "@mui/material";
import {Header} from "./components/header";
import {CacheProvider} from "@emotion/react";
import {prefixer} from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import Footer from "./components/Footer";
import {useEffect} from "react";
import {fetchAppData} from "./redux/appSlice";
import {LinkBehavior} from "./components/linkBehavior"
import PhoneCall from "./components/PhoneCall";
import Redirect from "./components/Redirect";


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
            // shade2: ,
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
        medium: {
            fontFamily: 'IRANSansXMedium',
            fontSize: 16,
            lineHeight: "24px",
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
});

function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAppData())
    }, [dispatch])

    return (
      <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <Header/>
                  <Routes>
                      <Route exact path={'/'} element={<Typography></Typography>}/>
                      <Route exact path='/call/:number' element={<PhoneCall />}/>
                      <Route exact path='/redirect/' element={<Redirect />}/>
                  </Routes>
                  <Footer />
              </BrowserRouter>
          </ThemeProvider>
      </CacheProvider>
    );
}

export default App;
