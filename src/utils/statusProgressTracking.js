import { COMPLETED, IN_PROGRESS, PENDING } from './status';

export const statusProgressTracking = (completedChapter, totalChapter) => {
    const percentage = totalChapter > 0 ? (completedChapter / totalChapter) * 100 : 0;
    if (percentage === 0) return PENDING;
    if (percentage === 100) return COMPLETED;
    return IN_PROGRESS;
};
