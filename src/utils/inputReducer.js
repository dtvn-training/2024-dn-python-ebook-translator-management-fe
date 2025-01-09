export const inputKey = {
    ADDTITLE: 'addTitle',
    ADDTYPE: 'addType',
    ADDLANGUAGE: 'addLanguage',
    ADDDATE: 'addDate',
    ADDSTATUS: 'addStatus',
    CLEAR: 'clear',
};

export const initState = {
    title: '',
    type: '',
    language: '',
    date: '',
    status: '',
};

export const inputReducer = (state, action) => {
    const { type, value = '' } = action;
    switch (type) {
        case inputKey.ADDTITLE:
            return { ...state, title: value };
        case inputKey.ADDTYPE:
            return { ...state, type: value };
        case inputKey.ADDLANGUAGE:
            return { ...state, language: value };
        case inputKey.ADDDATE:
            return { ...state, date: value };
        case inputKey.ADDSTATUS:
            return { ...state, status: value };
        case inputKey.CLEAR:
            return { ...initState };
        default:
            return state;
    }
};
