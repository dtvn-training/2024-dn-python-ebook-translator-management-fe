import { lazy } from 'react';
import { pathname } from './pathname';
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [{ pathname: pathname.HOME_PAGE, Element: Home }];
