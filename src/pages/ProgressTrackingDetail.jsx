import { Button, Pagination, Table, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DOWNLOAD_FILE, progressTrackingDetail } from '~/utils/urlApi';
import { get } from '~/db';
import formatDay from '~/utils/formatDay';
import { COMPLETED, PENDING, UNCOMPLETED } from '~/utils/status';

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
        width: '35%',
    },
    {
        title: 'Task Owner',
        dataIndex: 'taskOwner',
        key: 'taskOwner',
        width: '15%',
        align: 'center',
    },
    {
        title: 'Deadline',
        dataIndex: 'deadline',
        key: 'deadline',
        width: '10%',
        align: 'center',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        align: 'center',
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
        align: 'center',
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

    const { chapterCompleted, percentage } = useMemo(() => {
        let chapter = [];
        dataSource.forEach((item) => {
            if (item.status === COMPLETED) chapter.push(`chapter ${item.chapter}`);
        });
        const chapterPercentage = chapter.length > 0 ? Math.ceil((chapter.length / dataSource.length) * 100) : 0;
        chapter = chapter.join(', ');
        chapter.slice(0, 1);
        return {
            chapterCompleted: chapter === '' ? UNCOMPLETED : chapter,
            percentage: chapterPercentage,
        };
    }, [JSON.stringify(dataSource)]);

    return (
        <div className="space-y-2">
            <h1 className="font-medium">{book?.title}</h1>
            <h3>Language: {book?.language}</h3>
            <h3>Completed tasks: {chapterCompleted}</h3>
            <h3>Completed percentage: {percentage}%</h3>
            <Table pagination={false} className="pt-4 w-[98%] m-auto" columns={columns} dataSource={dataSource} />
        </div>
    );
}

export default ProgressTrackingDetail;
