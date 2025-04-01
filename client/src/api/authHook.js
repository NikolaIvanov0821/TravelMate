import request from "../utils/request";

const baseUrl = 'https://travelmate-eh27.onrender.com/users';

export const useRegister = () => {
    const register = async (data) => {
        return await request.post(baseUrl + '/register', data);
    };

    return { register };
};

export const useLogin = () => {
    const login = async (data) => {
        return await request.post(baseUrl + '/login', data);
    };

    return { login };
};

export const useGetUser = () => {
    const getUser = async (userId) => {
        return await request.get(`${baseUrl}/${userId}`)
    };

    return { getUser }
}