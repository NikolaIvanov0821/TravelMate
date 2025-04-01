import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./Blog.css";
import { useGetAllPosts } from "../../api/blogApi";
import { useUserContext } from "../../context/UserContext";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getAll } = useGetAllPosts();
    const { _id } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAll(); // Wait for API response
                setBlogs(data); // Set blogs state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    const listOfPosts = (blogs) => {
        const list = blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
                <script>{console.log(blog.image)}</script>
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <div className="blog-content">
                    <h3 className="blog-heading">{blog.title}</h3>
                    <p className="blog-category">{blog.category}</p>
                    <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
                    <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
                </div>
            </div>
        ));
        return list
    }

    return (
        <div className="blog-container">
            <header className="blog-header">
                <h2 className="blog-title">Explore Our Travel Stories</h2>
                {_id && <Link to="/blog/create" className="create-blog-button">Create Blog</Link>}
            </header>

            {/* Featured Blog Section */}
            {blogs.length > 0 && (
                <section className="featured-blog">
                    <img src={blogs[0].image} alt={blogs[0].title} className="featured-image" />
                    <div className="featured-content">
                        <h3>{blogs[0].title}</h3>
                        <p>{blogs[0].content.substring(0, 150)}...</p>
                        <Link to={`/blog/${blogs[0]._id}`} className="read-more">Read More</Link>
                    </div>
                </section>
            )}

            <div className="blog-grid">
                {listOfPosts(blogs)}
            </div>
        </div>
    );
}