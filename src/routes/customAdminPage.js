import { lazy } from 'react';
import { pathname } from './pathname';
const Home = lazy(() => import('~/pages/Home'));
const Create_task = lazy(() => import('~/pages/Create_task'));

export const adminPage = [
    { pathname: pathname.HOME_PAGE, Element: Home },
    { pathname: pathname.CREATE_TASK, Element: Create_task },
];
