import Blog from "../models/Blog.js";

const blogService = {
    create(postData) {
        return Blog.create(postData);
    }
};

export default blogService;