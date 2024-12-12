import { lazy } from 'react';
import { HOME_PAGE, REVIEW_TASK, TASK_MANAGEMENT } from '~/utils/constants';
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [{ pathname: HOME_PAGE, Element: Home }];

export const managerPage = [
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: REVIEW_TASK + '/:task_id', Element: null },
];
