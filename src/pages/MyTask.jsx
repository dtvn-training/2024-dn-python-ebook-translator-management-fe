import { Button, Table } from 'antd';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { TRANSCRIPT_TASK } from '~/utils/constants';

function MyTask() {
    const dataSource = [
        {
            key: '1',
            chapterName: 'Introduction to Programming',
            type: 'Video',
            deadline: '2024-12-25',
            salary: '$50',
            detail: 'Basic programming concepts',
        },
        {
            key: '2',
            chapterName: 'Advanced JavaScript',
            type: 'Document',
            deadline: '2025-01-15',
            salary: '$100',
            detail: 'Deep dive into ES6 features',
        },
        {
            key: '3',
            chapterName: 'React Basics',
            type: 'Quiz',
            deadline: '2025-02-01',
            salary: '$75',
            detail: 'Understanding React components and hooks',
        },
    ];

    const columns = [
        {
            title: 'No.',
            key: 'no',
            render: (text, record, index) => index + 1,
            width: '5%',
        },
        {
            title: 'Chapter Name',
            dataIndex: 'chapterName',
            key: 'chapterName',
            width: '25%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            width: '15%',
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            width: '10%',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text, record) => (
                <Link className="flex justify-center" to={`${TRANSCRIPT_TASK}/${record.key}`}>
                    <MdOutlineOpenInNew className="text-xl" />
                </Link>
            ),
            width: '5%', // Giảm chiều rộng cho cột chỉ chứa icon
            align: 'center', // Căn giữa để icon hiển thị đẹp hơn
        },
    ];

    return (
        <div>
            <h1>Task</h1>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default MyTask;
