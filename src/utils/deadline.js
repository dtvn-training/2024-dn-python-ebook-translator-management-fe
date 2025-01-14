export const isOver = (date) => {
    const deadline = new Date(date);
    const now = new Date();
    console.log(deadline.getTime(), now.getTime(), deadline);

    return deadline.getTime() < now.getTime();
};
