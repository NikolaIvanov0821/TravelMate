import request from "../utils/request";

const baseUrl = 'https://travelmate-eh27.onrender.com/blog';

export const useCreateBlog = () => {
    const create = async (blogData) => {
        return await request.post(baseUrl, blogData);
    };

    return { create }
}

export const useGetAllPosts = () => {
    const getAll = async () => {
        return await request.get(baseUrl);
    };

    return { getAll }
}

export const useGetPostById = () => {
    const getById = async (id) => {
        return await request.get(`${baseUrl}/${id}`);
    };

    return { getById }
}