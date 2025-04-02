import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDeleteBlogPost, useGetPostById, useUpdateBlogPost } from "../../api/blogApi";
import { useUserContext } from "../../context/UserContext";
import { useCreateComment, useGetComments } from "../../api/commentApi";
import { useGetUser } from "../../api/authHook";
import "./BlogDetails.css";

export default function BlogDetails() {
    const { id } = useParams();
    const { _id } = useUserContext();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [_, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const { deleteBlogPost } = useDeleteBlogPost();
    const navigate = useNavigate();
    const { update } = useUpdateBlogPost();
    const { getAll } = useGetComments();
    const { create } = useCreateComment();
    const { getUser } = useGetUser();
    const { getById } = useGetPostById();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getById(id);
                setBlog(data);
                setLikes(data.likes);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        const updatedLikes = blog.likes.includes(_id)
            ? blog.likes.filter((like) => like !== _id)
            : [...blog.likes, _id];

        setLikes(updatedLikes);
        await update(id, { ...blog, likes: updatedLikes });
    }

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

    const fetchComments = async () => {
        try {
            const data = await getAll(blog._id);

            const userRequests = data.map(async (comment) => {
                const userData = await getUser(comment.author);
                return { ...comment, username: userData.username };
            });

            const commentsWithUsers = await Promise.all(userRequests);
            setComments(commentsWithUsers);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        if (!blog?._id) {
            return
        }
        fetchComments();
    }, [blog]);

    const handleCommentSubmit = async (e) => {
        try {
            await create({ content: commentText, blog: blog._id, author: _id });
            setCommentText("");
            fetchComments();
        } catch (error) {
            console.error("Error adding comment:", error);
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
                    <Link to={`/blog/edit/${id}`} className="edit-button">Edit</Link>
                    <button onClick={handleDelete} className="delete-button">Delete</button>

                    
                </div>
            )}

            <div className="comments-section">
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p><strong>{comment.username}:</strong> {comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}

                {_id && (
                    <form className="comment-form" action={handleCommentSubmit}>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
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
