import { lazy } from 'react';
import { pathname } from './pathname';
import { UPLOAD_EBOOK } from '~/utils/constants';
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));
const Create_task = lazy(() => import('~/pages/Create_task'));

export const memberPage = [
    { pathname: pathname.HOME_PAGE, Element: Home },
    { pathname: pathname.TASK_MANAGEMENT, Element: TaskManagement },
];

export const adminPage = [{ pathname: UPLOAD_EBOOK, Element: UploadEbook }];
