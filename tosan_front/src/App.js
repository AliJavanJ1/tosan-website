import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import {useSelector} from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {red} from "@mui/material/colors";
import {Typography} from "@mui/material";


const theme = createTheme({
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
    // const temp = useSelector((state)=> state.app)
    // console.log(temp)

  return (
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<Typography></Typography>}/>
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
