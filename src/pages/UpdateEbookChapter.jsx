import { Button, Input, Select, Upload } from 'antd';
import { useEffect, useId, useState } from 'react';
import { get, post } from '~/db';
import {
    deleteChapter,
    DOWNLOAD_FILE,
    getChapterEbook,
    getLanguage,
    updateBook,
    updateChapter,
    uploadChapterUrl,
} from '~/utils/urlApi';
import { IoCloudUploadOutline } from 'react-icons/io5';
import ButtonCustom from '~/components/Button';
import { Link, useParams } from 'react-router-dom';

function UploadEbook() {
    const titleId = useId();
    const [languages, setLanguages] = useState([]);
    const [{ title, languageId, id }, setEbook] = useState({
        title: '',
        languageId: '',
        id: '',
    });
    const [chapters, setChapters] = useState([]);
    const bookId = useParams().id;

    const handleChangeEbook = (object) => {
        setEbook((pre) => ({ ...pre, ...object }));
    };

    const handleUploadFile = (file, index) => {
        setChapters((prev) => {
            const newChapters = [...prev];
            newChapters[index].file = [file];
            return newChapters;
        });
    };

    const handleRemoveFile = (index) => {
        setChapters((prev) => {
            const newChapters = [...prev];
            newChapters[index].file = [];
            return newChapters;
        });
    };

    const handleRemoveChapter = async (index) => {
        try {
            const chapter = chapters[index];
            if (chapter.id) {
                const resDelete = await post(`${deleteChapter}/${chapter.id}`);
                if (resDelete.status === 200) {
                    const newChapters = chapters.filter((_, i) => i !== index);
                    setChapters(newChapters);
                }
            } else {
                const newChapters = chapters.filter((_, i) => i !== index);
                setChapters(newChapters);
            }
        } catch (error) {
            if (error.status === 400) {
                alert('Chapter cannot be deleted due to existing translations.');
                return;
            }
        }
    };

    const handleUpload = async () => {
        try {
            await post(`${updateBook}/${id}`, {
                book_title: title,
                language_id: languageId,
            });
            const requests = [];
            chapters.forEach((item, index) => {
                if (item.id) {
                    const formData = new FormData();
                    formData.append('chapter_title', item.title);
                    if (item.file.length > 0) {
                        formData.append('file_content', item.file[0]);
                    }
                    formData.append('chapter_position', index + 1);
                    requests.push(
                        post(`${updateChapter}/${item.id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }),
                    );
                } else {
                    const formData = new FormData();
                    formData.append('book_id', id);
                    formData.append('chapter_title', item.title);
                    formData.append('file_content', item.file[0]);
                    formData.append('chapter_position', index + 1);
                    requests.push(
                        post(uploadChapterUrl, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }),
                    );
                }
            });
            await Promise.all(requests);
            alert('Update successfully');
        } catch (error) {
            alert('Update failed: ' + error.response.data.message);
        }
    };

    useEffect(() => {
        (async () => {
            const res = await get(getLanguage);
            if (res.status === 200 && res.statusText === 'OK') {
                setLanguages(res.data);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await get(`${getChapterEbook}/${bookId}`);
            if (res.status === 200) {
                const data = res.data.data;
                setEbook({
                    languageId: data.language_id,
                    title: data.book_title,
                    id: data.book_id,
                });
                const currentChapters = [];
                data.chapters.forEach((item) => {
                    const chapter = {
                        title: item.chapter_title,
                        id: item.chapter_id,
                        currentFile: [item.chapter_file],
                        file: [],
                    };
                    currentChapters.push(chapter);
                });
                setChapters(currentChapters);
            }
        })();
    }, []);

    return (
        <div className="w-[60%] space-y-4">
            <h1 className="font-medium text-[16px]">Upload E-book</h1>
            <div className="space-y-3">
                <div className="space-y-1">
                    <label className="text-[16px]" htmlFor={titleId}>
                        Title:
                    </label>
                    <Input
                        value={title}
                        onChange={(e) => handleChangeEbook({ title: e.target.value })}
                        placeholder="Add ebook name"
                        type="text"
                        id={titleId}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[16px] block">Language:</label>
                    <Select
                        className="!w-[200px]"
                        defaultValue={''}
                        value={languageId}
                        onChange={(id) => {
                            handleChangeEbook({ languageId: id });
                        }}
                        options={[
                            {
                                value: '',
                                label: 'Language',
                            },
                            ...languages.map((item) => ({
                                value: item.language_id,
                                label: item.title,
                            })),
                        ]}
                    />
                </div>
            </div>
            {chapters.map((item, index) => (
                <div key={item.key} className="space-y-2">
                    <div className="flex justify-between">
                        <h1 className="font-medium text-[16px] ">Chapter {index + 1}</h1>
                        <button
                            onClick={() => {
                                handleRemoveChapter(index);
                            }}
                            className="italic underline"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="space-y-1">
                                <label className="text-[16px]">Title:</label>
                                <Input
                                    value={item.title}
                                    onChange={(e) => {
                                        const newChapters = [...chapters];
                                        newChapters[index].title = e.target.value;
                                        setChapters(newChapters);
                                    }}
                                    placeholder="Add chapter name"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 relative">
                            <Upload
                                onRemove={() => handleRemoveFile(index)}
                                beforeUpload={(file) => handleUploadFile(file, index)}
                                fileList={item.file}
                            >
                                <Button icon={<IoCloudUploadOutline />}>Upload</Button>
                            </Upload>
                            {item.currentFile && (
                                <Link
                                    to={`${DOWNLOAD_FILE}/${item.currentFile}`}
                                    className="italic flex items-end underline h-[32px] absolute left-[100px]"
                                >
                                    <span>Current file</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <div className="space-x-4">
                <ButtonCustom
                    onClick={() => {
                        setChapters((prev) => [...prev, { title: '', id: '', file: [] }]);
                    }}
                    blue
                >
                    Add chapter
                </ButtonCustom>
                <ButtonCustom onClick={handleUpload} green>
                    Upload
                </ButtonCustom>
            </div>
        </div>
    );
}

export default UploadEbook;
