const url = (resource) => {
    return import.meta.env.VITE_API_URL || `http://localhost:5000/${resource}`;
};

export default url;
