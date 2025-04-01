import Blog from "../models/Blog";

const blogService = {
    create(postData) {
        return Blog.create(postData);
    }
};

export default blogService;