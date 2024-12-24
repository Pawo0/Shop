import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Header />}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
