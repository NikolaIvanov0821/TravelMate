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

    const getAllUserLiked = async (userId) => {
        return await request.get(`${baseUrl}?userLiked=${userId}`)
    };

    const getAllUserOwns = async (userId) => {
        return await request.get(`${baseUrl}?author=${userId}`)
    };

    return { getAll, getAllUserLiked, getAllUserOwns }
}

export const useGetPostById = () => {
    const getById = async (id) => {
        return await request.get(`${baseUrl}/${id}`);
    };

    return { getById }
}

export const useUpdateBlogPost = () => {
    const update = async (id, updated) => {
        return await request.put(`${baseUrl}/${id}`, updated)
    }

    return { update }
}

export const useDeleteBlogPost = () => {
    const deleteBlogPost = async (id) => {
        return await request.delete(`${baseUrl}/${id}`);
    }

    return { deleteBlogPost }
}