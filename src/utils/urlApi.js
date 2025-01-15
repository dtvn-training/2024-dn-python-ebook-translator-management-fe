export const getLanguage = '/language';
export const uploadBook = '/ebook/upload';
export const uploadChapterUrl = '/chapter/upload';
export const progressTrackingDetail = '/ebook/progress-tracking-detail';
export const DOWNLOAD_FILE = 'http://localhost:5000/api/files';
export const progressTracking = '/ebook/progress-tracking';
export const getMyTask = (key, language_id, status_id, categpory_id) => {
    return `/task/my-task?key=${key}&language_id=${language_id}&status_id=${status_id}&category_id=${categpory_id}`;
};
export const taskCategory = '/task-category';
export const getTaskStatus = '/task-category/my-task';
export const getTaskInformation = '/task/information';
export const getContent = '/content';
export const uploadContent = '/content/upload';
