import Comment from "../models/Comment";

const commentService = {
    create(comment) {
        return Comment.create(comment);
    }
};

export default commentService;