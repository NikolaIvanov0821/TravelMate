import request from "../utils/request";

const baseUrl = 'https://travelmate-eh27.onrender.com/users';

export const useRegister = () => {
    const register = async (data) => {
        return await request.post(baseUrl + '/register', data);
    };

    return { register };
};