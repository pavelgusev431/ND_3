import axios from 'axios';
import url from './getURL.js';

const loginMe = async () => {
    const response = await axios
        .post(url('users/me'), { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response;
};

export default loginMe;
