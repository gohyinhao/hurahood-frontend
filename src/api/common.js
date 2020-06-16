import queryString from 'query-string';

export const fetchData = async (path = '', params = {}) => {
    const query = queryString.stringify(params, { arrayFormat: 'bracket' });
    const url = BACKEND_URL + path + (query ? `?${query}` : '');

    const response = await fetch(url, {
        method: 'GET',
    });

    return response.json();
};

export const postData = async (path = '', data = {}) => {
    const url = BACKEND_URL + path;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const updateData = async (path = '', data = {}) => {
    const url = BACKEND_URL + path;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const deleteData = async (path = '') => {
    const url = BACKEND_URL + path;
    const response = await fetch(url, {
        method: 'DELETE',
    });

    return response.json();
};

export const uploadFile = async (path = '', file) => {
    const url = BACKEND_URL + path;
    const formData = new FormData().append('file', file);
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });

    return response.json();
};
