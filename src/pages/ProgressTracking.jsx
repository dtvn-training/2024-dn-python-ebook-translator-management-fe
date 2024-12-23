import { Button, Input, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '~/db';
import { getLanguage } from '~/utils/urlApi';
import { AiOutlineLink } from 'react-icons/ai';

function ProgressTracking() {
    const [{ bookTitle, language }, setInput] = useState({
        bookTitle: '',
        language: '',
    });
    const [dataTable, setDataTable] = useState([]);
    const [optionLanguages, setOptionLanguages] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await get(getLanguage);
            if (res.status === 200) {
                setOptionLanguages(res.data);
            }
        })();
    }, []);
    const columns = [
        {
            title: 'Ebook',
            dataIndex: 'ebook',
            key: 'ebook',
            width: '30%',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            width: '15%',
        },
        {
            title: 'Completed Chapter',
            dataIndex: 'completedChapter',
            key: 'completedChapter',
            width: '20%',
        },
        {
            title: 'Completed Percentage',
            dataIndex: 'completedPercentage',
            key: 'completedPercentage',
            width: '20%',
            render: (text) => `${text.toFixed(2)}%`,
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            width: '15%',
            render: (text, record) => (
                <Link>
                    <AiOutlineLink className="text-2xl text-blue-500" />
                </Link>
            ),
        },
    ];

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
                    <Button className="w-[150px]">Find</Button>
                </div>
            </div>
            <h1 className="mt-8 font-medium text-xl">Ebook</h1>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    );
}

export default ProgressTracking;
