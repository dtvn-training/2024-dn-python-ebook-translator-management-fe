import { lazy } from 'react';
import { HOME_PAGE, REGISTER_TASK, REGISTER_TASK_DETAIL, REVIEW_TASK, TASK_MANAGEMENT } from '~/utils/constants';
const RegisterTaskDetail = lazy(() => import('~/pages/RegisterTaskDetail'));
const RegisterTask = lazy(() => import('~/pages/RegisterTask'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [
    { pathname: HOME_PAGE, Element: Home },
    { pathname: REGISTER_TASK, Element: RegisterTask },
    { pathname: REGISTER_TASK_DETAIL + '/:task_id', Element: RegisterTaskDetail },
];

export const managerPage = [
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: REVIEW_TASK + '/:task_id', Element: null },
];
