import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {red} from "@mui/material/colors";
import {Typography} from "@mui/material";
import {Header} from "./components/header";
import {CacheProvider} from "@emotion/react";
import {prefixer} from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import {useEffect} from "react";
import {fetchAppData} from "./redux/appSlice";


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
            // shade3: ,
            shade4: `#001b3e`,
        },
        grey: {
            shade1: `#c2c7ce`,
            shade3: `#888888`,
            shade4: `#383838`,
        },
        white: {
            shade1: `#f2f2f2`,
            shade2: `#f7f7f7`,
            shade3: `#ffffff`,
        }
    },
    typography: {
        fontFamily: 'IRANSansXRegular',
        black: {
            fontFamily: 'IRANSansXBlack',
        },
        bold: {
            fontFamily: 'IRANSansXBold',
        },
        demiBold: {
            fontFamily: 'IRANSansXDemiBold',
        },
        extraBold: {
            fontFamily: 'IRANSansXExtraBold',
        },
        light: {
            fontFamily: 'IRANSansXLight',
        },
        medium: {
            fontFamily: 'IRANSansXMedium',
        },
        regular: {
            fontFamily: 'IRANSansXRegular',
        },
        thin:{
            fontFamily: 'IRANSansXThin',
        },
        ultraLight: {
            fontFamily: 'IRANSansXUltraLight',
        },
    },
    components: {
        MuiCssBaseline: {

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
                      <Route path={'/'} element={<Typography></Typography>}/>
                  </Routes>
              </BrowserRouter>
          </ThemeProvider>
      </CacheProvider>
  );
}

export default App;
