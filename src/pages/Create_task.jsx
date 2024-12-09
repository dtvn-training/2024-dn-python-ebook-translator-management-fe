import React, { useState } from 'react';
import { Transfer, Button, Dropdown, Space, Cascader, Input } from 'antd';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Ebook 1
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Ebook 2
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Ebook 3
            </a>
        ),
    },
];

const mockData = Array.from({
    length: 5,
}).map((_, i) => ({
    key: i.toString(),
    title: `Chapter ${i + 1}`,
    description: `description of content${i + 1}`,
}));

const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);
const Create_task = () => {
    const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const handleChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys);
        console.log('targetKeys: ', newTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown
                        className="mb-8"
                        menu={{
                            items,
                        }}
                        placement="bottomLeft"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <Button className="bg-gray-200 w-80 space-x-52">
                            <h6>Ebook</h6>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1"
                                stroke="currentColor"
                                class="size-4"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </Button>
                    </Dropdown>
                </Space>
            </Space>
            <Transfer
                dataSource={mockData}
                titles={['Chapter', 'Target']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onScroll={handleScroll}
                render={(item) => item.title}
                oneWay
                style={{
                    marginBottom: 16,
                }}
            />
            <div>
                <h4 className="mt-4 mb-4">Chapter 4</h4>
                <Cascader className="mb-4" value={'Deadline'} />
                <br></br>
                Salary: <Input placeholder="Salary" className="mb-4" style={{ width: '20%' }} />
                <br></br>
                <Button type="primary" style={{ width: '28%' }}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default Create_task;
