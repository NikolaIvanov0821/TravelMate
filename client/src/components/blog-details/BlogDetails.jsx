import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import "./BlogDetails.css";
import { useDeleteBlogPost, useGetPostById, useUpdateBlogPost } from "../../api/blogApi";
import { useUserContext } from "../../context/UserContext";

export default function BlogDetails() {
    const { id } = useParams();
    const { _id } = useUserContext();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getById } = useGetPostById();
    const [likes, setLikes] = useState([]);
    const { update } = useUpdateBlogPost();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: "", image: "", category: "", content: "" });
    const { deleteBlogPost } = useDeleteBlogPost();
    const navigate = useNavigate();

    //console.log(blog.author);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getById(id);
                setBlog(data);
                setLikes(data.likes);
                setEditForm({ title: data.title, image: data.image, category: data.category, content: data.content });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        let updated = blog;

        if (blog.likes.includes(_id)) {
            updated.likes.pop(_id)

        } else {
            updated.likes.push(_id)
        }
        setLikes(updated.likes)
        console.log(updated);
        await update(id, updated).then(setLikes(updated.likes))
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditForm({ title: blog.title, image: blog.image, category: blog.category, content: blog.content });
        }
    };

    const handleInputChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            const updatedBlog = { ...blog, ...editForm };
            await update(id, updatedBlog);
            setBlog(updatedBlog);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
            try {
                await deleteBlogPost(id);
                navigate("/blog");
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!blog) return <p className="error">Blog post not found.</p>;

    return (
        <div className="blog-details-container">
            <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
            <img src={blog.image} alt={blog.title} className="blog-details-image" />
            <h2 className="blog-details-title">{blog.title}</h2>
            <p className="blog-details-meta">
                By <span className="author">{blog.author}</span> | {new Date(blog.createdAt).toDateString()}
            </p>
            <p className="blog-details-content">{blog.content}</p>

            {_id && _id !== blog.author
                ? (<button onClick={handleLike} className="like-button">
                    {blog.likes.length > 0 && blog.likes.includes(_id) ? "Unlike" : "Like"}
                </button>)
                : null}

            {_id === blog.author && (
                <div className="owner-actions">
                    <button onClick={handleEditToggle} className="edit-button">
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button onClick={handleDelete} className="delete-button">Delete</button>

                    {isEditing && (
                        <div className="edit-form">
                            <label>Title:</label>
                            <input type="text" name="title" value={editForm.title} onChange={handleInputChange} />

                            <label>Image URL:</label>
                            <input type="text" name="image" value={editForm.image} onChange={handleInputChange} />

                            <label>Category:</label>
                            <select name="category" value={editForm.category} onChange={handleInputChange}>
                                <option value="Adventure">Adventure</option>
                                <option value="Food">Food</option>
                                <option value="Culture">Culture</option>
                                <option value="Nature">Nature</option>
                            </select>

                            <label>Content:</label>
                            <textarea name="content" value={editForm.content} onChange={handleInputChange} />

                            <button onClick={handleSaveChanges} className="save-button">Save</button>
                        </div>
                    )}
                </div>
            )}

            <div className="comments-section">
                <h3>Comments</h3>
                {blog.comments.length > 0 ? (
                    blog.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p><strong>{comment.author}:</strong> {comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}

                {_id && (
                    <form className="comment-form">
                        <textarea
                            //value={commentText}
                            //onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            required
                        />
                        <button type="submit">Add Comment</button>
                    </form>
                )}
            </div>
        </div>
    );
}
