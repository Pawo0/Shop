import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./pages/Header.tsx";
import Home from "./pages/Home.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Header />}>
            <Route index element={<Home />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
