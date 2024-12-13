import { number, object, string } from 'yup';

export const ebookValidation = object({
    title: string().required('E-book name is required'),
    languageId: number().required('Language id is required'),
});

export const chapterValidation = object({
    title: string().required('Chapter name is required'),
    fileName: string().required('The document is required'),
});
