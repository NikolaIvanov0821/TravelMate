import { useState } from "react";
import { Link } from "react-router";
import "./Blog.css";
import { useGetAllPosts } from "../../api/blogApi";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getAll } = useGetAllPosts();

    try {
        const data = getAll();
        setBlogs(data);
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="blog-container">
            <h2 className="blog-title">Explore Our Travel Stories</h2>
            <div className="blog-grid">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-card">
                        <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                        <div className="blog-content">
                            <h3 className="blog-heading">{blog.title}</h3>
                            <p className="blog-category">{blog.category}</p>
                            <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
                            <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}