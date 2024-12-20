import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { get } from '~/db';
import { TRANSCRIPT_TASK } from '~/utils/constants';
import formatDay from '~/utils/formatDay';
import { formatMoney } from '~/utils/formatMoney';
import { optionAuth } from '~/utils/optionFormData';
import { toastError, toastInfo } from '~/utils/toastConfig';
import { getMyTask } from '~/utils/urlApi';

function MyTask() {
    const [dataSource, setDataSource] = useState([]);
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
            width: '10%',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            width: '10%',
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            width: '10%',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
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

    useEffect(() => {
        (async () => {
            try {
                const res = await get(getMyTask, optionAuth);
                if (res.status === 200) {
                    const data = res.data.data;
                    const source = data.map((data) => ({
                        key: data.task_id,
                        chapterName: data.chapter_title,
                        type: data.type,
                        language: data.language,
                        deadline: formatDay(data.deadline),
                        salary: formatMoney(data.salary),
                    }));
                    setDataSource(source);
                }
            } catch (error) {
                if (error.status === 401) {
                    toastInfo('Token expired');
                }
                if (error.status === 400) {
                    toastError(error.response.data.message);
                }
            }
        })();
    }, []);

    return (
        <div>
            <h1 className="text-xl mb-4">My Task</h1>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default MyTask;
