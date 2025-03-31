import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import { Route, Routes } from "react-router"
import Home from "./components/home/Home.jsx"
import Register from "./components/register/Register.jsx"
import Login from "./components/login/Login.jsx"
import UserProvider from "./providers/UserProvider.jsx"


function App() {

    return (
        <>
            <UserProvider>
                <Header />

                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

                <Footer />
            </UserProvider>

        </>
    )
}

export default App
