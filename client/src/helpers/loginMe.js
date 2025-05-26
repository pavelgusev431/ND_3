import axios from 'axios';
import url from './getURL.js';

const loginMe = async () => {
    const response = await axios
        .get(url('users/me'), { withCredentials: true })
        .catch((error) => {
            return error.message;
        });
    return response.data;
};

export default loginMe;
