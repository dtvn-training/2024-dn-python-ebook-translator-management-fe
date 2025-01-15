export const limit = 20;

export const isCallApi = (container) => {
    return container.scrollTop + container.clientHeight >= container.scrollHeight - 50;
};
