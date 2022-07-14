import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import {useSelector} from "react-redux";

function App() {
    // const temp = useSelector((state)=> state.app)
    // console.log(temp)

  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<>hi</>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
