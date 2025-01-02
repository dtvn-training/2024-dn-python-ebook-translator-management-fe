export const optionFormAndAuth = {
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
};

export const optionAuth = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
};
