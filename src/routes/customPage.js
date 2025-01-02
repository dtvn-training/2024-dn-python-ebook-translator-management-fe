import { lazy } from 'react';
import { HOME_PAGE, PROGRESS_TRACKING_DETAIL, PROGRESS_TRACKING, UPLOAD_EBOOK, MY_TASK } from '~/utils/constants';
const ProgressTrackingDetail = lazy(() => import('~/pages/ProgressTrackingDetail'));
const ProgressTracking = lazy(() => import('~/pages/ProgressTracking'));
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const Home = lazy(() => import('~/pages/Home'));
const MyTask = lazy(() => import('~/pages/MyTask'));

export const memberPage = [
    { pathname: HOME_PAGE, Element: Home },
    { pathname: MY_TASK, Element: MyTask },
];

export const adminPage = [
    { pathname: UPLOAD_EBOOK, Element: UploadEbook },
    { pathname: PROGRESS_TRACKING_DETAIL + '/:book_id', Element: ProgressTrackingDetail },
    { pathname: PROGRESS_TRACKING, Element: ProgressTracking },
];
