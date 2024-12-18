import React, { useState, useEffect } from 'react';
import { Transfer, Button, Select, Space, Input, DatePicker, Alert } from 'antd';
import { get, post } from '~/db';

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
    const [deadline, setDeadline] = useState({});
    const [salary, setSalary] = useState({});
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    const handleFindBooks = async () => {
        try {
            const res_book = await get('/books');
            if (res_book.status === 200) {
                setBooks(res_book.data);
                if (res_book.data.length > 0) {
                    const firstBook = res_book.data[0];
                    setSelectedBook(firstBook.book_id);
                }
            } else {
                console.log('Error fetching books:', res_book.status);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchChapters = async (bookId) => {
        try {
            const res_chapter = await get(`/chapters/${bookId}`);
            if (res_chapter.status === 200) {
                const chapterData = res_chapter.data.map((chapter) => ({
                    key: chapter.chapter_id.toString(),
                    title: chapter.chapter_title,
                }));
                setChapters(chapterData);
                setTargetKeys([]);
                setSelectedKeys([]);
                setDeadline({});
                setSalary({});
            } else {
                console.log('Error fetching chapters:', res_chapter.status);
            }
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage('');
            setAlertType('');
        }, 3000);
    };

    useEffect(() => {
        handleFindBooks();
    }, []);

    const handleTransfer = async () => {
        if (!selectedBook) {
            setError('Please choose a book.');
            return;
        }
        if (targetKeys.length === 0) {
            setError('Please select at least one chapter.');
            return;
        }

        const currentDate = new Date();
        for (const chapterKey of targetKeys) {
            if (new Date(deadline[chapterKey]) <= currentDate) {
                setError('The deadline must be a future date.');
                return;
            }

            if (!salary[chapterKey] || salary[chapterKey] < 0) {
                setError('Salary must be greater than 0.');
                return;
            }
        }

        const taskDataList = targetKeys.map((chapterKey) => ({
            chapter_id: chapterKey,
            deadline: deadline[chapterKey],
            salary: salary[chapterKey],
        }));

        try {
            const response = await post('/tasks/create/', taskDataList);
            if (!response || response.status !== 201) {
                setError('There was an issue creating the tasks. Please try again later.');
                return;
            }

            console.log('Tasks created successfully:', response.data);
            showAlert('Tasks created successfully!', 'success');

            setChapters([]);
            setSelectedBook(null);
            setTargetKeys([]);
            setSelectedKeys([]);
            setDeadline({});
            setSalary({});
        } catch (error) {
            console.error('Error creating tasks:', error);
            setError('Create Tasks Fail!');
            showAlert('There was an error creating the tasks.', 'error');
        }
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
                titles={['Available', 'Selected']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => item.title}
                className="mt-8"
            />
            {alertMessage && <Alert message={alertMessage} type={alertType} showIcon className="mt-4" />}
            {targetKeys.length === 0 && (
                <Alert
                    message="Please choose at least 1 chapter to create task"
                    type="warning"
                    showIcon
                    className="mt-4"
                />
            )}

            <div className="flex space-x-10 mt-8">
                {targetKeys.map((chapterKey, index) => {
                    const chapter = chapters.find((chap) => chap.key === chapterKey);
                    return (
                        <div key={index}>
                            <h4 className="mt-4 mb-4">
                                {chapter.title}
                                {error && <Alert message={error} type="error" showIcon className="mt-2" />}
                            </h4>
                            Deadline:{' '}
                            <Space direction="vertical" size={12} className="mb-4">
                                <DatePicker
                                    showTime
                                    onChange={(value, dateString) => {
                                        setDeadline((prevDeadline) => ({
                                            ...prevDeadline,
                                            [chapterKey]: dateString,
                                        }));
                                    }}
                                    onOk={onOk}
                                />
                            </Space>
                            <br />
                            Salary:
                            <Input
                                placeholder="Salary"
                                className="mb-4 ml-4"
                                style={{ width: '78%' }}
                                onChange={(e) => {
                                    setSalary((prevSalary) => ({
                                        ...prevSalary,
                                        [chapterKey]: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <Button type="primary" style={{ width: '10%' }} onClick={handleTransfer}>
                Submit
            </Button>
        </div>
    );
};

export default Create_task;
