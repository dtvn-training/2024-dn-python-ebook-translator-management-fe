export const TITLE = 'title';
export const FILE = 'file';
export const ADDCHAPTER = 'addchaper';
export const REMOVECHAPTER = 'removechaper';
export const CLEAR = 'clear';

export const initChapter = [
    {
        key: 1,
        title: '',
        file: [],
    },
];

export const chapterReducer = (state, action) => {
    const { key, payload } = action;
    switch (key) {
        case TITLE:
            return state.map((item, index) => (index === payload.index ? { ...item, title: payload.value } : item));
        case FILE:
            return state.map((item, index) => (index === payload.index ? { ...item, file: payload.value } : item));
        case ADDCHAPTER:
            const newInitChapter = { ...initChapter[0] };
            newInitChapter.key = state.length > 0 ? state[state.length - 1].key + 1 : 1;
            return [...state, { ...newInitChapter }];
        case REMOVECHAPTER:
            return state.filter((_, index) => index !== payload.index);
        case CLEAR:
            return initChapter;
        default:
            return state;
    }
};
