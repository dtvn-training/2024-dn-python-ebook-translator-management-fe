import { lazy } from 'react';
import {
    HOME_PAGE,
    REGISTER_TASK,
    REGISTER_TASK_DETAIL,
    REVIEW_TASK,
    TASK_MANAGEMENT,
    TRANSCRIPT_TASK,
    UPLOAD_EBOOK,
} from '~/utils/constants';
const TranscriptTask = lazy(() => import('~/pages/TranscriptTask'));
const RegisterTaskDetail = lazy(() => import('~/pages/RegisterTaskDetail'));
const RegisterTask = lazy(() => import('~/pages/RegisterTask'));
const UploadEbook = lazy(() => import('~/pages/UploadEbook'));
const TaskManagement = lazy(() => import('~/pages/TaskManagement'));
const Home = lazy(() => import('~/pages/Home'));

export const memberPage = [
    { pathname: HOME_PAGE, Element: Home },
    { pathname: REGISTER_TASK, Element: RegisterTask },
    { pathname: REGISTER_TASK_DETAIL + '/:task_id', Element: RegisterTaskDetail },
    { pathname: TRANSCRIPT_TASK + '/:task_id', Element: TranscriptTask },
];

export const managerPage = [
    { pathname: TASK_MANAGEMENT, Element: TaskManagement },
    { pathname: REVIEW_TASK + '/:task_id', Element: null },
];

export const adminPage = [{ pathname: UPLOAD_EBOOK, Element: UploadEbook }];
