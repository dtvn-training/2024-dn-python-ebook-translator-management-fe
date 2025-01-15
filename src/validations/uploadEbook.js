import { number, object, string } from 'yup';

export const ebookValidation = object({
    title: string().required('E-book name is required'),
    languageId: number().required('Language id is required'),
});

export const chapterValidation = object({
    title: string().required('Chapter name is required'),
    fileName: string().required('The document is required'),
});

export const uploadContentValidation = (task_id, translationFile, content) => {
    if (!task_id) {
        alert('Dont find task id');
        return false;
    }
    if (translationFile.length === 0 && !content) {
        alert('Please upload file or content');
        return false;
    }
    if (translationFile.length > 0 && content) {
        alert('Dont upload file and translation at the same time');
        return false;
    }
    return true;
};
