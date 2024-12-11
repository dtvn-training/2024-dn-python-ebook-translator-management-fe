import React, { useState, useEffect } from 'react';
import { Transfer, Button, Select, Space, Input, DatePicker, Alert } from 'antd';
import { get } from '~/db';
import warning from 'antd/es/_util/warning';

const onOk = (value) => {
    console.log('onOk: ', value);
};

const Create_task = () => {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [error, setError] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [salary, setSalary] = useState('');

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    const handleFindBooks = async () => {
        try {
            const res_book = await get('/books');
            if (res_book.status === 200 || res_book.statusText === 'OK') {
                setBooks(res_book.data);
                if (res_book.data.length > 0) {
                    const firstBook = res_book.data[0];
                    setSelectedBook(firstBook.book_id);
                }
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchChapters = async (bookId) => {
        try {
            const res_chapter = await get(`/chapters/${bookId}`);
            if (res_chapter.status === 200 || res_chapter.statusText === 'OK') {
                const chapterData = res_chapter.data.map((chapter) => ({
                    key: chapter.chapter_id.toString(),
                    title: chapter.chapter_title,
                }));
                setChapters(chapterData);
                setTargetKeys([]);
                setSelectedKeys([]);
            }
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    useEffect(() => {
        handleFindBooks();
    }, []);

    const handleTransfer = () => {
        const currentTime = new Date();
        if (!selectedBook || targetKeys.length === 0) {
            setError('Please chose least a book and a chapter');
            return;
        }
        if (isNaN(deadline)) {
            setError('Please input deadline!');
            return;
        }
        if (deadline <= currentTime) {
            setError('Deadline must be greater now!');
            return;
        }
        if (isNaN(salary) || salary <= 0) {
            setError('Salary not empty must be greater 0!');
            return;
        }
        setError('');
    };

    return (
        <div>
            <Space direction="vertical">
                <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Select a Book"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={books.map((book) => ({
                        value: book.book_id,
                        label: book.book_title,
                    }))}
                    onChange={(value) => {
                        setSelectedBook(value);
                        fetchChapters(value);
                    }}
                />
            </Space>

            <Transfer
                dataSource={chapters}
                titles={['Available Chapters', 'Selected Chapters']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => item.title}
                className="mt-8"
            />

            <div>
                <h4 className="mt-4 mb-4">
                    Notification: {error && <Alert message={error} type="error" showIcon className="mt-2" />}{' '}
                </h4>
                Deadline:
                <Space direction="vertical" size={12} className="mb-4">
                    <DatePicker
                        showTime
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                    />
                </Space>
                <br />
                Salary: <Input placeholder="Salary" className="mb-4 ml-4" style={{ width: '8%' }} />
                <br />
                <Button type="primary" style={{ width: '10%' }} onClick={handleTransfer}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Create_task;
