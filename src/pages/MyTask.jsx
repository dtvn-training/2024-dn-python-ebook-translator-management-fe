import { Input, Select, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Button from '~/components/Button';
import ContainTask from '~/components/ContainTask';
import Task from '~/components/Task';
import { get } from '~/db';
import { optionAuth } from '~/utils/optionFormData';
import { TRANSLATE } from '~/utils/taskCategory';
import { getLanguage, getMyTask, getTaskStatus, taskCategory } from '~/utils/urlApi';

function MyTask() {
    const [currentTab, setCurrentTab] = useState('');
    const [languages, setLanguages] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [types, setTypes] = useState([]);
    const [{ toDo, inProgress, done }, setDataSource] = useState({
        toDo: [],
        inProgress: [],
        done: [],
    });
    const [{ language, status, key, type }, setFilter] = useState({
        language: '',
        status: '',
        key: '',
        type: '',
    });
    useEffect(() => {
        (async () => {
            try {
                const resLanguages = get(getLanguage);
                const resTypes = get(taskCategory);
                const resStatuses = get(getTaskStatus);
                getTask(key, language, status, type);
                const [languageData, typeData, statusData] = await Promise.all([resLanguages, resTypes, resStatuses]);
                setLanguages(languageData.data);
                setTypes(typeData.data);
                setStatuses(statusData.data.data);
            } catch (error) {
                alert('Failed to initialize');
            }
        })();
    }, []);

    useEffect(() => {
        getTask('', '', currentTab, '');
    }, [currentTab]);

    const getTask = async (key, language, status, type) => {
        try {
            const resTasks = await get(getMyTask(key, language, status, type), optionAuth);
            const data = resTasks.data.data;
            setDataSource({
                toDo: data.to_do,
                inProgress: data.in_progress,
                done: data.done,
            });
        } catch (error) {
            alert('Failed to get tasks');
        }
    };

    const handleFilter = async () => {
        getTask(key, language, status, type);
    };

    return (
        <div className="space-y-6">
            <div className="flex space-x-6">
                <Input
                    placeholder="Enter name"
                    onChange={(e) => {
                        setFilter((prev) => ({ ...prev, key: e.target.value }));
                    }}
                    value={key}
                    className="w-[40%]"
                    prefix={<IoSearchSharp className="text-xl" />}
                />
                <Select
                    className="w-[15%]"
                    defaultValue={''}
                    options={[
                        { label: 'Language', value: '' },
                        ...languages.map((item) => ({ label: item.title, value: item.language_id })),
                    ]}
                    value={language}
                    onSelect={(value) => {
                        setFilter((prev) => ({ ...prev, language: value }));
                    }}
                />
                <Select
                    className="w-[15%]"
                    defaultValue={''}
                    options={[
                        { label: 'Status', value: '' },
                        ...statuses.map((item) => ({ label: item.status_title, value: item.status_task_id })),
                    ]}
                    value={status}
                    onSelect={(value) => {
                        setFilter((prev) => ({ ...prev, status: value }));
                    }}
                />
                <Select
                    className="w-[15%]"
                    defaultValue={''}
                    options={[
                        { label: 'Type', value: '' },
                        ...types.map((item) => ({ label: item.title, value: item.task_category_id })),
                    ]}
                    value={type}
                    onSelect={(value) => {
                        setFilter((prev) => ({ ...prev, type: value }));
                    }}
                />
                <Button onClick={handleFilter} className="text-white flex-1" green>
                    Search
                </Button>
            </div>
            <div className="space-x-6">
                <button
                    onClick={() => {
                        setFilter({ language: '', status: '', key: '', type: '' });
                        setCurrentTab('');
                    }}
                    className={`${currentTab === '' ? 'text-green' : ''} text-[16px] transition-colors`}
                >
                    All
                </button>
                {statuses.map((item) => (
                    <button
                        onClick={() => {
                            setCurrentTab(item.status_task_id);
                        }}
                        className={`${
                            currentTab === item.status_task_id ? 'text-green' : ''
                        } text-[16px] transition-colors`}
                    >
                        {item.status_title}
                    </button>
                ))}
            </div>
            <div className="flex space-x-6">
                <ContainTask style={{ width: '30%' }} title={'To do'} quantity={toDo.length}>
                    {toDo.map((item) => (
                        <Task
                            taskId={item.task_id}
                            title={item.chapter_title}
                            deadline={item.deadline}
                            language={item.language}
                            tag={item.type}
                            color={item.type === TRANSLATE ? 'bg-translate' : 'bg-review'}
                        />
                    ))}
                    {toDo.length === 0 && <p className="text-center text-lg">Dont have any task</p>}
                </ContainTask>
                <ContainTask style={{ width: '33.33%' }} title={'In progress'} quantity={inProgress.length}>
                    {inProgress.map((item) => (
                        <Task
                            taskId={item.task_id}
                            title={item.chapter_title}
                            deadline={item.deadline}
                            language={item.language}
                            tag={item.type}
                            color={item.type === TRANSLATE ? 'bg-translate' : 'bg-review'}
                        />
                    ))}
                    {inProgress.length === 0 && <p className="text-center text-lg">Dont have any task</p>}
                </ContainTask>
                <ContainTask style={{ width: '33.33%' }} title={'Done'} quantity={done.length}>
                    {done.map((item) => (
                        <Task
                            taskId={item.task_id}
                            title={item.chapter_title}
                            deadline={item.deadline}
                            language={item.language}
                            tag={item.type}
                            color={item.type === TRANSLATE ? 'bg-translate' : 'bg-review'}
                            done
                        />
                    ))}
                    {done.length === 0 && <p className="text-center text-lg">Dont have any task</p>}
                </ContainTask>
            </div>
        </div>
    );
}

export default MyTask;
