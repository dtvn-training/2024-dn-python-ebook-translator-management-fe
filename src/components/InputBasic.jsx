import { DatePicker, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { get } from '~/db';
import { inputKey } from '~/utils/inputReducer';
import { toastInfo } from '~/utils/toastConfig';
import { getLanguage, taskCategoryUrl } from '~/utils/urlApi';

function InputBasic({ dispatch, state, handleFind, isLanguage }) {
    const { title, type, language } = state;
    const [taskCategory, setTaskCategory] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let res = [];
                isLanguage && res.push(get(getLanguage));
                res.push(get(taskCategoryUrl));
                const [resLanguages, resTaskCategories] = await Promise.all(res);
                if (resTaskCategories?.status == 200 && resTaskCategories?.statusText == 'OK') {
                    setTaskCategory(resTaskCategories?.data);
                }

                if (resLanguages.status === 200 && resLanguages.statusText === 'OK') {
                    if (resTaskCategories) {
                        setLanguages(resLanguages.data);
                    } else {
                        setTaskCategory(resLanguages.data);
                    }
                }
            } catch (error) {
                toastInfo('Failed to get information');
            }
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
                            ...languages.map((item) => ({
                                value: item.language_id,
                                label: item.title,
                            })),
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
