export const taskCategoryUrl = '/task-category';
export const taskManagementUrl = (title = '', deadline = '', type = '') => {
    return `/task?key=${title}&deadline=${deadline}&task_category_id=${type}`;
};
export const getLanguage = '/language';
export const uploadBook = '/ebook/upload';
export const uploadChapterUrl = '/chapter/upload';
export const progressTrackingDetail = '/ebook/progress-tracking-detail';
export const DOWNLOAD_FILE = 'http://localhost:5000/api/files';
export const progressTracking = '/ebook/progress-tracking';
