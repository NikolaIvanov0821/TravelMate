import Comment from "../models/Comment.js";

const commentService = {
    create(comment) {
        return Comment.create(comment);
    },

    getAll(filter = {}) {
        let query = Comment.find({});
        
        if (filter.blog) {
            query = query.where({ blog: filter.blog });
        }

        return query;
    }
};

export default commentService;