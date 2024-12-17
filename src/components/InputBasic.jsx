import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Button from '~/components/Button';
import { inputKey } from '~/routes/inputReducer';

function InputBasic({ dispatch, state }) {
    const { title, type, language, date, status } = state;
    return (
        <>
            <div className="flex justify-between space-x-3">
                <Input
                    value={title}
                    onChange={(e) => {
                        dispatch({
                            type: inputKey.ADDTITLE,
                            value: e.target.value,
                        });
                    }}
                    placeholder="Add chapter name"
                    className="lg:!w-[60%]"
                />
                <Select
                    className="!flex-1"
                    onChange={(e) => {
                        dispatch({
                            type: inputKey.ADDTYPE,
                            value: e,
                        });
                    }}
                    value={type}
                    defaultValue={type}
                    options={[
                        {
                            value: '',
                            label: 'Type',
                        },
                        {
                            value: 1,
                            label: 'Translate',
                        },
                        {
                            value: 2,
                            label: 'Beta',
                        },
                    ]}
                />
                <Select
                    className="!flex-1"
                    defaultValue={language}
                    onChange={(e) => {
                        dispatch({ type: inputKey.ADDLANGUAGE, value: e });
                    }}
                    value={language}
                    options={[
                        {
                            value: '',
                            label: 'Language',
                        },
                        {
                            value: 1,
                            label: 'English',
                        },
                        {
                            value: 2,
                            label: 'Laos',
                        },
                    ]}
                />
                <Button
                    onClick={() => {
                        dispatch({ type: inputKey.CLEAR });
                    }}
                >
                    Find
                </Button>
            </div>
            <div className="space-x-3">
                <DatePicker
                    onChange={(e) => {
                        dispatch({
                            type: inputKey.ADDDATE,
                            value: e?.$d || new Date(),
                        });
                    }}
                    format={'MM/DD/YYYY'}
                    value={dayjs(date.toLocaleDateString('en-GB'), 'MM/DD/YYYY')}
                />
                <Select
                    className="!w-[150px]"
                    defaultValue={status}
                    onChange={(e) => {
                        dispatch({ type: inputKey.ADDSTATUS, value: e });
                    }}
                    value={status}
                    options={[
                        {
                            value: '',
                            label: 'Status',
                        },
                        {
                            value: 1,
                            label: 'Finish',
                        },
                        {
                            value: 2,
                            label: 'On going',
                        },
                        {
                            value: 3,
                            label: 'Over deadline',
                        },
                    ]}
                />
            </div>
        </>
    );
}

export default InputBasic;
