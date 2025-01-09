import { lazy } from 'react';

import {
    HOME_PAGE,
    PROGRESS_TRACKING_DETAIL,
    PROGRESS_TRACKING,
    TASK_MANAGEMENT,
    UPLOAD_EBOOK,
    REGISTER_TASK,
    REGISTER_TASK_DETAIL,
    REVIEW_TASK,
} from '~/utils/constants';
const ProgressTrackingDetail = lazy(() => import('~/pages/ProgressTrackingDetail'));
const ProgressTracking = lazy(() => import('~/pages/ProgressTracking'));
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));
const RegisterTaskDetail = lazy(() => import('~/pages/RegisterTaskDetail'));
const RegisterTask = lazy(() => import('~/pages/RegisterTask'));

export const memberPage = [
    { pathname: HOME_PAGE, Element: Home },
    { pathname: REGISTER_TASK, Element: RegisterTask },
    { pathname: REGISTER_TASK_DETAIL + '/:task_id', Element: RegisterTaskDetail },
];

export const managerPage = [
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: REVIEW_TASK + '/:task_id', Element: null },
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
];

export const adminPage = [
    { pathname: UPLOAD_EBOOK, Element: UploadEbook },
    { pathname: PROGRESS_TRACKING_DETAIL + '/:book_id', Element: ProgressTrackingDetail },
    { pathname: PROGRESS_TRACKING, Element: ProgressTracking },
];
