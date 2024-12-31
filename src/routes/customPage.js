import { lazy } from 'react';
import {
    HOME_PAGE,
    PROGRESS_TRACKING_DETAIL,
    PROGRESS_TRACKING,
    TASK_MANAGEMENT,
    UPLOAD_EBOOK,
    LADDING,
} from '~/utils/constants';
const ProgressTrackingDetail = lazy(() => import('~/pages/ProgressTrackingDetail'));
const ProgressTracking = lazy(() => import('~/pages/ProgressTracking'));
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));
const Ladding = lazy(() => import('~/pages/Ladding'));

export const memberPage = [
    { pathname: HOME_PAGE, Element: Home },
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: LADDING, Element: Ladding, noLayout: true },
];

export const adminPage = [
    { pathname: UPLOAD_EBOOK, Element: UploadEbook },
    { pathname: PROGRESS_TRACKING_DETAIL + '/:book_id', Element: ProgressTrackingDetail },
    { pathname: PROGRESS_TRACKING, Element: ProgressTracking },
];
