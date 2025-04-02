import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useDeleteBlogPost, useGetAllPosts, useUpdateBlogPost } from "../../api/blogApi";
import { useDeleteTrip, useGetAllTrips, useUpdateTrip } from "../../api/tripsApi";
import { Link } from "react-router";
import "./Profile.css";
import { useGetUser } from "../../api/authHook";

export default function Profile() {
    const { _id } = useUserContext();
    const { getAllUserOwns, getAllUserLiked } = useGetAllPosts();
    const { getAllTripsByUser, getAllTripsUserIsIn } = useGetAllTrips();
    const { getUser } = useGetUser();
    const { update } = useUpdateBlogPost();
    const { updateTrip } = useUpdateTrip();
    const { deleteBlogPost } = useDeleteBlogPost();
    const { deleteTrip } = useDeleteTrip();
    const [user, setUser] = useState({});
    const [ownedBlogs, setOwnedBlogs] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState([]);
    const [ownedTrips, setOwnedTrips] = useState([]);
    const [joinedTrips, setJoinedTrips] = useState([]);

    useEffect(() => {
        if (!_id) return;

        const fetchData = async () => {
            const user = await getUser(_id);
            setUser(user);

            const blogs = await getAllUserOwns(_id);
            setOwnedBlogs(blogs);

            const liked = await getAllUserLiked(_id);
            setLikedBlogs(liked);

            const trips = await getAllTripsByUser(_id);
            setOwnedTrips(trips);

            const joined = await getAllTripsUserIsIn(_id);
            setJoinedTrips(joined);
        };

        fetchData();
    }, [_id]);

    const handleUnlike = async (blog) => {
        const blogId = blog._id
        const likes = blog.likes.filter((like) => like !== _id);
        blog = { ...blog, likes }
        await update(blogId, blog);
        setLikedBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
    };

    const handleLeaveTrip = async (trip) => {
        console.log(trip);
        const tripId = trip._id;
        const participants = trip.participants.filter((participant) => participant !== _id)
        trip = { ...trip, participants }
        await updateTrip(tripId, trip);
        setJoinedTrips((prevTrips) => prevTrips.filter(trip => trip._id !== tripId));
    };

    const handleDeleteBlog = async (blogId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
            await deleteBlogPost(blogId);
            setOwnedBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
        }
    };

    const handleDeleteTrip = async (tripId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
        if (confirmDelete) {
            await deleteTrip(tripId);
            setOwnedTrips((prevTrips) => prevTrips.filter(trip => trip._id !== tripId));
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-meta-container">
                <img src="https://placehold.co/100" alt="profile image" />
                <div className="user-info">
                    <p><i className="fa-solid fa-user"></i>Username: {user.username}</p>
                    <p><i className="fa-solid fa-phone"></i>Phone Number: {user.phone}</p>
                    <p><i className="fa-solid fa-envelope"></i>Email: {user.email}</p>
                </div>
            </div>

            <section>
                <h3>Your Blogs</h3>
                {ownedBlogs.length > 0 ? (
                    <div className="grid">
                        {ownedBlogs.map(blog => (
                            <div key={blog._id} className="blog-card">
                                <h4>{blog.title}</h4>
                                <Link to={`/blog/${blog._id}`} className="view-button">View</Link>
                                <Link to={`/blog/edit/${blog._id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDeleteBlog(blog._id)} className="delete-button">Delete</button>
                            </div>
                        ))}
                    </div>
                ) : <p>No blogs yet.</p>}
            </section>

            <section>
                <h3>Liked Blogs</h3>
                {likedBlogs.length > 0 ? (
                    <div className="grid">
                        {likedBlogs.map(blog => (
                            <div key={blog._id} className="blog-card">
                                <h4>{blog.title}</h4>
                                <Link to={`/blog/${blog._id}`} className="view-button">View</Link>
                                <button onClick={() => handleUnlike(blog)} className="unlike-button">Unlike</button>
                            </div>
                        ))}
                    </div>
                ) : <p>No liked blogs.</p>}
            </section>

            <section>
                <h3>Your Trips</h3>
                {ownedTrips.length > 0 ? (
                    <div className="grid">
                        {ownedTrips.map(trip => (
                            <div key={trip._id} className="trip-card">
                                <h4>{trip.title}</h4>
                                <p>{trip.destination}</p>
                                <Link to={`/trips/${trip._id}`} className="view-button">View</Link>
                                <Link to={`/trips/edit/${trip._id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDeleteTrip(trip._id)} className="delete-button">Delete</button>
                            </div>
                        ))}
                    </div>
                ) : <p>No trips created.</p>}
            </section>

            <section>
                <h3>Trips You're In</h3>
                {joinedTrips.length > 0 ? (
                    <div className="grid">
                        {joinedTrips.map(trip => (
                            <div key={trip._id} className="trip-card">
                                <h4>{trip.title}</h4>
                                <p>{trip.destination}</p>
                                <Link to={`/trips/${trip._id}`} className="view-button">View</Link>
                                <button onClick={() => handleLeaveTrip(trip)} className="leave-button">Leave</button>
                            </div>
                        ))}
                    </div>
                ) : <p>No trips joined.</p>}
            </section>
        </div>
    );
}