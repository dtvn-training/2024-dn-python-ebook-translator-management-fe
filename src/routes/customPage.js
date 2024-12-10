import { lazy } from 'react';
import { pathname } from './pathname';
const RegisterTask = lazy(() => import('~/pages/RegisterTask'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [
    { pathname: pathname.HOME_PAGE, Element: Home },
    {
        pathname: pathname.REGISTER_TASK,
        Element: RegisterTask,
    },
];

export const managerPage = [
    { pathname: pathname.TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: pathname.REVIEW_TASK + '/:task_id', Element: null },
];
