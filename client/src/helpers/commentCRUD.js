import axios from 'axios';
import url from './getURL.js';

const createComment = async (data, userId) => {
    const response = await axios
        .post(url(`comments`), {...data, userId: userId}, { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response;
};

const getComments = async () => {
    const response = await axios
        .get(url(`comments`), { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response.data.data;
};

const editComment = async (id, data) => {
    const response = await axios
        .patch(url(`comments/${id}`), data, { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response;
};

const deleteComment = async (id) => {
    const response = await axios
        .delete(url(`comments/${id}`), { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response;
};

export {createComment, getComments, editComment, deleteComment};
