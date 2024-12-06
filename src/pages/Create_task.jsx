import React, { useState } from 'react';
import { Switch, Transfer, Button, Dropdown, Space } from 'antd';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

const mockData = Array.from({
    length: 5,
}).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
}));
const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);
const Create_task = () => {
    const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [disabled, setDisabled] = useState(false);
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
    const handleDisable = (checked) => {
        setDisabled(checked);
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
                disabled={disabled}
                oneWay
                style={{
                    marginBottom: 16,
                }}
            />
            <Switch
                unCheckedChildren="disabled"
                checkedChildren="disabled"
                checked={disabled}
                onChange={handleDisable}
            />
        </>
    );
};

export default Create_task;
