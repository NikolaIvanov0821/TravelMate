import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import { Route, Routes } from "react-router"
import Home from "./components/home/Home.jsx"
import Register from "./components/register/Register.jsx"


function App() {

    return (
        <>
            <Header />


            <Routes>
                <Route index element={<Home/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>


            <Footer />
        </>
    )
}

export default App
