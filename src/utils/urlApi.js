export const taskCategoryUrl = '/task-category';
export const taskManagementUrl = (title = '', deadline = '', type = '') => {
    return `/task?key=${title}&deadline=${deadline}&task_category_id=${type}`;
};
