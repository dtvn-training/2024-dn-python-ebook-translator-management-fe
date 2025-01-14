import { Input, Select, Tabs } from 'antd';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Button from '~/components/Button';
import ContainTask from '~/components/ContainTask';
import Task from '~/components/Task';

const tabs = [
    {
        key: 1,
        label: 'All',
    },
    {
        key: 2,
        label: 'To do',
    },
    {
        key: 3,
        label: 'In progress',
    },
    {
        key: 4,
        label: 'Done',
    },
];

function MyTask() {
    const [currentTab, setCurrentTab] = useState(1);
    return (
        <div className="space-y-6">
            <div className="flex space-x-6">
                <Input placeholder="Enter name" className="w-[40%]" prefix={<IoSearchSharp className="text-xl" />} />
                <Select
                    className="w-[15%]"
                    defaultValue={'1'}
                    options={[
                        { label: 'Language', value: '1' },
                        { label: 'Language 2', value: '2' },
                        { label: 'Language 3', value: '3' },
                    ]}
                />
                <Select
                    className="w-[15%]"
                    defaultValue={'1'}
                    options={[
                        { label: 'Status', value: '1' },
                        { label: 'Status 2', value: '2' },
                        { label: 'Status 3', value: '3' },
                    ]}
                />
                <Select
                    className="w-[15%]"
                    defaultValue={'1'}
                    options={[
                        { label: 'Type', value: '1' },
                        { label: 'Status 2', value: '2' },
                        { label: 'Status 3', value: '3' },
                    ]}
                />
                <Button className="text-white flex-1" green>
                    Search
                </Button>
            </div>
            <div className="space-x-6">
                {tabs.map((item) => (
                    <button
                        onClick={() => {
                            setCurrentTab(item.key);
                        }}
                        className={`${currentTab === item.key ? 'text-green' : ''} text-[16px] transition-colors`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="flex space-x-6">
                <ContainTask style={{ width: '30%' }} title={'To do'} quantity={5}>
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date()}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                </ContainTask>
                <ContainTask style={{ width: '33.33%' }} title={'In progress'} quantity={5}>
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date()}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                </ContainTask>
                <ContainTask style={{ width: '33.33%' }} title={'Done'} quantity={5}>
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date('01/20/2024')}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date('01/20/2026')}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date()}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date()}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date()}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                    <Task
                        title={'Doraemon va nhung nguoi ban cua'}
                        deadline={new Date()}
                        language={'English'}
                        tag={'Translate'}
                        color={'bg-translate'}
                    />
                </ContainTask>
            </div>
        </div>
    );
}

export default MyTask;
