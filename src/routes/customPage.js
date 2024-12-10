import { lazy } from 'react';
import { pathname } from './pathname';
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [{ pathname: pathname.HOME_PAGE, Element: Home }];

export const managerPage = [
    { pathname: pathname.TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: pathname.REVIEW_TASK + '/:task_id', Element: null },
];
