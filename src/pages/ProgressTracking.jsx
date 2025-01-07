import { Button, Input, Pagination, Select, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '~/db';
import { getLanguage, progressTracking } from '~/utils/urlApi';
import { AiOutlineLink } from 'react-icons/ai';
import { LIMIT_PROGRESS_TRACKING } from '~/utils/pagination';
import { statusProgressTracking } from '~/utils/statusProgressTracking';
import CustomTag from '~/components/CustomTag';
import { PROGRESS_TRACKING_DETAIL } from '~/utils/constants';

const columns = [
    {
        title: 'No',
        dataIndex: 'index',
        key: 'index',
        width: '5%',
    },
    {
        title: 'Ebook',
        dataIndex: 'ebook',
        key: 'ebook',
        width: '35%',
    },
    {
        title: 'Chapter',
        dataIndex: 'chapter',
        key: 'chapter',
        width: '10%',
        align: 'center',
    },
    {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
        width: '12%',
        align: 'center',
    },
    {
        title: 'Total tasks',
        dataIndex: 'totalTasks',
        key: 'totalTasks',
        width: '10%',
        align: 'center',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => <CustomTag type={text} />,
        width: '13%',
        align: 'center',
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
        key: 'detail',
        width: '10%',
        render: (text, record) => (
            <Link to={`${PROGRESS_TRACKING_DETAIL}/${record.key}`} className="inline-block">
                <AiOutlineLink className="text-2xl text-blue-500" />
            </Link>
        ),
        align: 'center',
    },
];

function ProgressTracking() {
    const [{ bookTitle, language }, setInput] = useState({
        bookTitle: '',
        language: '',
    });
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataTable, setDataTable] = useState([]);
    const [optionLanguages, setOptionLanguages] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await get(getLanguage);
            if (res.status === 200) {
                setOptionLanguages(res.data);
            }
            handleFind(true);
        })();
    }, [currentPage]);

    const handleFind = async (isNextPage = false) => {
        if (!isNextPage) {
            setCurrentPage(1);
        }
        const progress = await get(
            `${progressTracking}?key=${bookTitle}&language=${language}&current_page=${currentPage}&limit=${LIMIT_PROGRESS_TRACKING}`,
        );
        if (progress.status === 200) {
            const data = progress.data.data;

            const dataSource = data.information.map((item, index) => {
                const chapters = item.chapter;
                const completedChapter = chapters.reduce((acc, chapter) => {
                    if (chapter.is_completed) {
                        return acc + 1;
                    }
                    return acc;
                }, 0);
                return {
                    key: item.book_id,
                    ebook: item.book_title,
                    language: item.language,
                    totalTasks: item.chapter.length,
                    chapter: item.total_chapter,
                    status: statusProgressTracking(completedChapter, chapters.length),
                    index: index + 1 + (currentPage - 1) * LIMIT_PROGRESS_TRACKING,
                };
            });
            setDataTable(dataSource);
            setTotalRecords(data.total_records);
        }
    };

    return (
        <div>
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <div className="flex justify-between space-x-3">
                    <Input
                        value={bookTitle}
                        onChange={(e) => {
                            setInput((prev) => ({ ...prev, bookTitle: e.target.value }));
                        }}
                        placeholder="Add book's name"
                        className="lg:!w-[70%]"
                    />
                    <Select
                        className="!flex-1"
                        onChange={(e) => {
                            setInput((prev) => ({ ...prev, language: e }));
                        }}
                        defaultValue={''}
                        options={[
                            {
                                value: '',
                                label: 'Language',
                            },
                            ...optionLanguages.map((item) => ({ value: item.language_id, label: item.title })),
                        ]}
                    />
                    <Button onClick={handleFind} className="w-[150px]">
                        Find
                    </Button>
                </div>
            </div>
            <h1 className="mt-8 font-medium text-xl">Ebook</h1>
            <Table columns={columns} pagination={false} dataSource={dataTable} />
            <Pagination
                className="mt-2"
                defaultValue={1}
                onChange={(e) => {
                    setCurrentPage(e);
                }}
                current={currentPage}
                total={Math.ceil(totalRecords / LIMIT_PROGRESS_TRACKING) * 10}
                align="end"
            />
        </div>
    );
}

export default ProgressTracking;
