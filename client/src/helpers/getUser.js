import axios from 'axios';
import url from './getURL.js';

const getUserById = async (id) => {
    const response = await axios
        .get(url(`users/${id}`), { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response.data.data.username;
};

export {getUserById};
