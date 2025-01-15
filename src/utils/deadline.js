export const isOver = (date) => {
    const deadline = new Date(date);
    const now = new Date();
    return deadline.getTime() < now.getTime();
};
