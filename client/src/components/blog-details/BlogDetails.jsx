import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import "./BlogDetails.css";
import { useGetPostById } from "../../api/blogApi";

export default function BlogDetails() {
    const { id } = useParams();
    
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getById } = useGetPostById();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getById(id);
                setBlog(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!blog) return <p className="error">Blog post not found.</p>;

    return (
        <div className="blog-details-container">
            <img src={blog.image} alt={blog.title} className="blog-details-image" />
            <h2 className="blog-details-title">{blog.title}</h2>
            <p className="blog-details-meta">
                By <span className="author">{blog.author}</span> | {new Date(blog.createdAt).toDateString()}
            </p>
            <p className="blog-details-content">{blog.content}</p>

            <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
        </div>
    );
}
