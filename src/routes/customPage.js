import { lazy } from 'react';
import { HOME, PROGRESS_TRACKING_DETAIL, TASK_MANAGEMENT, UPLOAD_EBOOK } from '~/utils/constants';
const ProgressTrackingDetail = lazy(() => import('~/pages/ProgressTrackingDetail'));
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [
    { pathname: HOME, Element: Home },
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
];

export const adminPage = [
    { pathname: UPLOAD_EBOOK, Element: UploadEbook },
    { pathname: PROGRESS_TRACKING_DETAIL + '/:book_id', Element: ProgressTrackingDetail },
];
