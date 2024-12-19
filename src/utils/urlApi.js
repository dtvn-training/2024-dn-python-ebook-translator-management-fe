export const taskCategoryUrl = '/task-category';
export const taskManagementUrl = (title = '', deadline = '', type = '', currentPage, limit) => {
    return `/task?key=${title}&deadline=${deadline}&task_category_id=${type}&current_page=${currentPage}&limit=${limit}`;
};
export const taskRegister = (title, type, language, currentPage, limit) => {
    return `/task/registe-task?key=${title}&type=${type}&language=${language}&current_page=${currentPage}&limit=${limit}`;
};
export const getLanguage = '/language';
export const renderToken = '/user/auto-authen';
export const registerTask = '/task/register-task';
export const DOWNLOAD_FILE = 'http://localhost:5000/api/files';
export const uploadBook = '/ebook/upload';
export const uploadChapterUrl = '/chapter/upload';
export const getTaskInformation = '/task/information';
export const getContent = '/content';
export const uploadContent = '/content/upload';
export const getComment = '/comment';
export const confirmComment = '/comment/confirm-comment';
