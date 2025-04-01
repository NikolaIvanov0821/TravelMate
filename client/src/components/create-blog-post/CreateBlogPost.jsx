import "./CreateBlogPost.css";
import { useNavigate } from "react-router";
import { useActionState } from "react";
import request from "../../utils/request";
import { useUserContext } from "../../context/UserContext";
import { useCreateBlog } from "../../api/blogApi";

export default function CreateBlogPost() {
    const navigate = useNavigate();
    const { _id } = useUserContext();
    const { create } = useCreateBlog();

    const initialState = {
        title: "",
        imageUrl: "",
        category: "",
        content: "",
        error: null,
    };

    const submitHandler = async (state, formData) => {
        const title = formData.get("title");
        const image = formData.get("imageUrl");
        const category = formData.get("category");
        const content = formData.get("content");

        if (!title || !image || !category || !content) {
            return { ...state, error: "All fields are required!" };
        }

        try {
            const response = await create({ title, image, category, content, author: _id })

            navigate("/blog"); 
        } catch (error) {
            return { ...state, error: error.message };
        }

        return initialState; 
    };

    const [formState, formAction] = useActionState(submitHandler, initialState);

    return (
        <div className="create-blog-container">
            <h2>Create a New Blog Post</h2>
            {formState.error && <p className="error-message">{formState.error}</p>}
            
            <form action={formAction}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={formState.title} required />

                <label htmlFor="imageUrl">Image URL:</label>
                <input type="text" name="imageUrl" defaultValue={formState.imageUrl} required />

                <label htmlFor="category">Category:</label>
                <select name="category" defaultValue={formState.category} required>
                    <option value="">Select a category</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Food">Food</option>
                    <option value="Culture">Culture</option>
                    <option value="Nature">Nature</option>
                </select>

                <label htmlFor="content">Content:</label>
                <textarea name="content" defaultValue={formState.content} required />

                <button type="submit" className="submit-button">Create Post</button>
            </form>
        </div>
    );
}