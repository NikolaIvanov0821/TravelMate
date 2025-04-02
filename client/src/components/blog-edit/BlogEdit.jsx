import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetPostById, useUpdateBlogPost } from "../../api/blogApi";
import { useUserContext } from "../../context/UserContext";
import "./BlogEdit.css";

export default function BlogEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById } = useGetPostById();
    const { update } = useUpdateBlogPost();
    const { _id } = useUserContext();

    const [blog, setBlog] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const data = await getById(id);

                if (data.author !== _id) {
                    navigate("/blog");
                    return;
                }

                setBlog({
                    title: data.title,
                    content: data.content,
                    image: data.image,
                    category: data.category,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id, getById, _id, navigate]);

    async function handleSubmit(formData) {
        const updatedData = Object.fromEntries(formData);
        try {
            await update(id, updatedData);
            navigate(`/blog/${id}`);
        } catch (err) {
            setError("Failed to update blog.");
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="edit-blog-container">
            <h2>Edit Blog Post</h2>
            {error && <p className="error-message">{error}</p>}

            <form action={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={blog.title}
                    required
                />

                <label htmlFor="image">Image URL:</label>
                <input
                    type="text"
                    name="image"
                    defaultValue={blog.image}
                    required
                />

                <label htmlFor="category">Category:</label>
                <select name="category" defaultValue={blog.category} required>
                    <option value="">Select a category</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Food">Food</option>
                    <option value="Culture">Culture</option>
                    <option value="Nature">Nature</option>
                </select>

                <label htmlFor="content">Content:</label>
                <textarea
                    name="content"
                    defaultValue={blog.content}
                    required
                />

                <button type="submit" className="submit-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
