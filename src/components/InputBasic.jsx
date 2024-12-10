import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { get } from '~/db';
import { inputKey } from '~/utils/inputReducer';

function InputBasic({ dispatch, state, handleFind, isLanguage }) {
    const { title, type, language } = state;
    const [taskCategory, setTaskCategory] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await get('/task-category');
                if (res.status === 200 && res.statusText === 'OK') {
                    setTaskCategory(res.data);
                }
            } catch (error) {}
        })();
    }, []);

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
                    className="lg:!w-[40%] xl:!w-[50%] 2xl:!w-[60%]"
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
                        ...taskCategory.map((item) => ({
                            value: item.task_category_id,
                            label: item.title,
                        })),
                    ]}
                />

                {isLanguage ? (
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
                ) : (
                    <DatePicker
                        onChange={(e) => {
                            dispatch({
                                type: inputKey.ADDDATE,
                                value: e?.$d || '',
                            });
                        }}
                        format={'MM/DD/YYYY'}
                    />
                )}

                <Button
                    onClick={() => {
                        handleFind();
                    }}
                >
                    Find
                </Button>
            </div>
        </>
    );
}

export default InputBasic;
