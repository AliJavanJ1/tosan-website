import {
    BrowserRouter, Route, Routes
} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<>hi</>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
