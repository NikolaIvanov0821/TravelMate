import Blog from "../models/Blog.js";
import querystring from "querystring"

const blogService = {
    create(postData) {
        return Blog.create(postData);
    },

    getAll(filter = {}) {
        let query = Blog.find();

        if (filter.where) {
            const q = querystring.parse(filter.where.replaceAll('"', ''))
            query.find(q)
        }

        if (filter.userLiked) {
            query = query.where({ likes: { $in: [filter.userLiked] } });
        }

        if (filter.author) {
            query = query.where({ author: filter.author })
        }

        return query;
    },

    getById(id) {
        return Blog.findById(id);
    },

    updateBlog(blogId, updatedBlog) {
        return Blog.findByIdAndUpdate(blogId, updatedBlog);
    },

    deleteBlog(blogId) {
        return Blog.findByIdAndDelete(blogId);
    }
};

export default blogService;