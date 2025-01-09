import { Button, Pagination, Table, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DOWNLOAD_FILE, progressTrackingDetail } from '~/utils/urlApi';
import { get } from '~/db';
import formatDay from '~/utils/formatDay';
import { COMPLETED, PENDING } from '~/utils/status';

const columns = [
    {
        title: 'Chapter',
        dataIndex: 'chapter',
        key: 'chapter',
        width: '10%',
        render: (text) => {
            return <p>{'Chapter ' + text}</p>;
        },
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
        render: (text, record) => {
            return (
                <Link
                    to={record.filename ? `${DOWNLOAD_FILE}/${record.filename}` : ''}
                    className={`text-blue-500 ${!record.filename ? 'opacity-55' : ''}`}
                    type="link"
                >
                    <DownloadOutlined />
                </Link>
            );
        },
    },
];

function ProgressTrackingDetail() {
    const [book, setBook] = useState();
    const [dataSource, setDataSource] = useState([]);
    const { book_id } = useParams();
    useEffect(() => {
        (async () => {
            const res = await get(`${progressTrackingDetail}/${book_id}`);
            if (res.status === 200) {
                const data = res.data.data;
                setBook(data.book);
                let details = data.details.map((item) => {
                    let status = item.task_category;
                    if (item.is_completed) {
                        status = COMPLETED;
                    }
                    return {
                        key: item.chapter_id,
                        title: item.title,
                        taskOwner: item.fullname ? item.fullname : PENDING,
                        deadline: item.deadline ? formatDay(item.deadline) : PENDING,
                        status: status ? status : PENDING,
                        chapter: item.chapter_position,
                        filename: item?.filename,
                    };
                });
                details = details.sort((a, b) => a.chapter - b.chapter);
                setDataSource(details);
            }
        })();
    }, []);
    return (
        <div className="space-y-2">
            <h1 className="font-medium">{book?.title}</h1>
            <h3>Language: {book?.language}</h3>
            <h3>Completed tasks: Chapter1, Chapter2</h3>
            <h3>Completed percentage: 80%</h3>
            <Table pagination={false} className="pt-4 w-[98%] m-auto" columns={columns} dataSource={dataSource} />
        </div>
    );
}

export default ProgressTrackingDetail;
