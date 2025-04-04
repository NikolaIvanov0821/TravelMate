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
import CreateBlogPost from "./components/blog-post-create/CreateBlogPost.jsx"
import Blog from "./components/blog/Blog.jsx"
import BlogDetails from "./components/blog-details/BlogDetails.jsx"
import Trips from "./components/trips/Trips.jsx"
import CreateTrip from "./components/trips-create/TripsCreate.jsx"
import TripsDetails from "./components/trips-details/TripsDetails.jsx"
import EditTrip from "./components/trips-edit/TripsEdit.jsx"
import BlogEdit from "./components/blog-edit/BlogEdit.jsx"
import Profile from "./components/user-profile/Profile.jsx"
import Contact from "./components/static-pages/Contacts.jsx"
import TermsConditions from "./components/static-pages/TermsConditions.jsx"
import PrivacyPolicy from "./components/static-pages/Privacy.jsx"
import About from "./components/static-pages/AboutPage.jsx"
import NotFound from "./components/not-found/NotFound.jsx"


function App() {

    return (
        <>
            <UserProvider>
                <Header />

                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route element={<GuestGuard />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/blog/create" element={<CreateBlogPost />} />
                        <Route path="/blog/edit/:id" element={<BlogEdit />} />
                        <Route path="/trips" element={<Trips />} />
                        <Route path="/trips/create" element={<CreateTrip />} />
                        <Route path="/trips/:id" element={<TripsDetails />} />
                        <Route path="/trips/edit/:id" element={<EditTrip />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </UserProvider>

        </>
    )
}

export default App
