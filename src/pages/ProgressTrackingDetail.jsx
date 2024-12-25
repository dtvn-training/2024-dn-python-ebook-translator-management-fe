import { Button, Pagination, Table, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: 'Chapter',
        dataIndex: 'chapter',
        key: 'chapter',
        width: '10%',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
    },
    {
        title: 'Task Owner',
        dataIndex: 'taskOwner',
        key: 'taskOwner',
        width: '20%',
    },
    {
        title: 'Deadline',
        dataIndex: 'deadline',
        key: 'deadline',
        width: '10%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
    },
    {
        title: 'Download',
        key: 'download',
        width: '5%',
        render: () => <Button type="link" icon={<DownloadOutlined />} />,
    },
];

const data = [
    {
        key: '1',
        chapter: 'Chapter 1',
        title: 'Introduction to Ant Design',
        taskOwner: 'John Doe',
        deadline: '2024-12-30',
        status: 'Completed',
    },
    {
        key: '2',
        chapter: 'Chapter 2',
        title: 'Understanding Table Components',
        taskOwner: 'Jane Smith',
        deadline: '2025-01-05',
        status: 'In Progress',
    },
    {
        key: '3',
        chapter: 'Chapter 3',
        title: 'Advanced Usage of Ant Design',
        taskOwner: 'Mike Johnson',
        deadline: '2025-01-10',
        status: 'Pending',
    },
];

function ProgressTrackingDetail() {
    const [book, setBook] = useState();
    useEffect(() => {
        (async () => {
            
        })();
    }, []);
    return (
        <div className="space-y-2">
            <h1 className="font-medium">Doraemon and his friends</h1>
            <h3>Language: English</h3>
            <h3>Completed tasks: Chapter1, Chapter2</h3>
            <h3>Completed percentage: 80%</h3>
            <Table pagination={false} className="pt-4 w-[98%] m-auto" columns={columns} dataSource={data} />
        </div>
    );
}

export default ProgressTrackingDetail;
