import { lazy } from 'react';
import { pathname } from './pathname';
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [
    { pathname: pathname.HOME_PAGE, Element: Home },
    { pathname: pathname.TASK_MANAGEMENT, Element: TaskManagement },
];
