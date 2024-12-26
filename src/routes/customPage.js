import { lazy } from 'react';
import { HOME_PAGE, PROGRESS_TRACKING, TASK_MANAGEMENT, UPLOAD_EBOOK } from '~/utils/constants';
const ProgressTracking = lazy(() => import('~/pages/ProgressTracking'));
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [
    { pathname: HOME_PAGE, Element: Home },
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
];

export const adminPage = [
    { pathname: UPLOAD_EBOOK, Element: UploadEbook },
    { pathname: PROGRESS_TRACKING, Element: ProgressTracking },
];
