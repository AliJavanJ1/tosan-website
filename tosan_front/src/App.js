import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import {useSelector} from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {red} from "@mui/material/colors";
import {Typography} from "@mui/material";
import {Header} from "./components/header";
import {CacheProvider} from "@emotion/react";
import {prefixer} from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: red[500],
        },
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
    const temp = useSelector((state)=> state.app)
    // console.log(temp)

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
