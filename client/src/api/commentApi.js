import request from "../utils/request";

const baseUrl = 'https://travelmate-eh27.onrender.com/comments';

export const useCreateComment = () => {
    const create = async (comment) => {
        return await request.post(baseUrl, comment);
    }

    return { create }
};

export const useGetComments = () => {
    const getAll = (blogId) => {
        return request.get(`${baseUrl}?blog=${blogId}`)
    }

    return { getAll }
}