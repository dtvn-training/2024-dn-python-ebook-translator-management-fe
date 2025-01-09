import { toast } from 'react-toastify';

export const toastSuccess = (content) => {
    toast.success(content);
};
export const toastError = (content) => {
    toast.error(content);
};
export const toastInfo = (content) => {
    toast.info(content);
};
export const toastWarning = (content) => {
    toast.warning(content);
};
