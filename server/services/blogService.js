import Blog from "../models/Blog.js";
import querystring from "querystring"

const blogService = {
    create(postData) {
        return Blog.create(postData);
    },

    getAll(filter = {}) {
        const query = Blog.find();

        if (filter.where) {
            const q = querystring.parse(filter.where.replaceAll('"', ''))
            query.find(q)
        }

        return query;
    }
};

export default blogService;