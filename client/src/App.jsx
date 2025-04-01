import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import { Route, Routes } from "react-router"
import Home from "./components/home/Home.jsx"
import Register from "./components/register/Register.jsx"
import Login from "./components/login/Login.jsx"
import UserProvider from "./providers/UserProvider.jsx"
import GuestGuard from "./guards/GuestGuard.jsx"
import AuthGuard from "./guards/AuthGuard.jsx"
import Logout from "./components/logout/Logout.jsx"
import CreateBlogPost from "./components/create-blog-post/CreateBlogPost.jsx"
import Blog from "./components/blog/Blog.jsx"


function App() {

    return (
        <>
            <UserProvider>
                <Header />

                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/blog" element={<Blog/>} />
                    <Route element={<GuestGuard />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/blog/create" element={<CreateBlogPost />} />
                    </Route>
                </Routes>

                <Footer />
            </UserProvider>

        </>
    )
}

export default App
