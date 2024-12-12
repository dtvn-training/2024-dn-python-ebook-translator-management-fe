export const taskCategoryUrl = '/task-category';
export const taskManagementUrl = (title = '', deadline = '', type = '') => {
    return `/task?key=${title}&deadline=${deadline}&task_category_id=${type}`;
};
export const taskRegister = (title, type, language) => {
    return `/task/registe-task?key=${title}&type=${type}&language=${language}`;
};
export const getLanguage = '/language';
export const renderToken = '/user/auto-authen';
export const registerTask = '/task/register-task/';
export const DOWLOADN_FILE = 'http://localhost:5000/api/files';
