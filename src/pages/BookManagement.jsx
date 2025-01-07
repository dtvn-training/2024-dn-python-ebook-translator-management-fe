import { Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { get } from '~/db';
import { UPDATE_EBOOK_CHAPTER } from '~/utils/constants';
import { LIMIT_BOOK_MANAGEMENT } from '~/utils/pagination';
import { bookManagement } from '~/utils/urlApi';

function BookManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
            width: '10%',
            align: 'center',
        },
        {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            width: '40%',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
                <Link className="inline-block" to={UPDATE_EBOOK_CHAPTER + '/' + record.key}>
                    <CiEdit className="text-2xl" />
                </Link>
            ),
            align: 'center',
            width: '10%',
        },
        {
            title: 'Remove',
            key: 'remove',
            render: () => (
                <button>
                    <MdOutlineDeleteOutline className="text-2xl" />
                </button>
            ),
            align: 'center',
            width: '10%',
        },
    ];
    useEffect(() => {
        (async () => {
            const res = await get(`${bookManagement}?page=${currentPage}&limit=${LIMIT_BOOK_MANAGEMENT}`);
            if (res.status === 200) {
                let data = res.data.data;
                let { book, total_record: records } = data;
                book = book.map((item, index) => ({
                    key: item.book_id,
                    book: item.title,
                    language: item.language,
                    index: index + 1,
                }));
                setDataSource(book);
                setTotalRecord(records);
            }
        })();
    }, [currentPage]);
    return (
        <div className="mt-4">
            <h1 className="ml-[100px] font-medium text-xl mb-3">Book Management</h1>
            <Table pagination={false} className="w-[80%] m-auto" dataSource={dataSource} columns={columns} />
            <Pagination
                className="mt-3"
                align="end"
                defaultCurrent={1}
                total={Math.ceil(totalRecord / LIMIT_BOOK_MANAGEMENT) * 10}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default BookManagement;
