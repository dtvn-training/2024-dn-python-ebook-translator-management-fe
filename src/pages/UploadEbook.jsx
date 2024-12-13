import { Button, Input, Select, Upload } from 'antd';
import { useEffect, useId, useReducer, useState } from 'react';
import { get } from '~/db';
import { getLanguage } from '~/utils/urlApi';
import { IoCloudUploadOutline } from 'react-icons/io5';
import ButtonCustom from '~/components/Button';
import { ADDCHAPTER, chapterReducer, FILE, initChapter, REMOVECHAPTER, TITLE } from '~/utils/chapterReducer';
import { chapterValidation, ebookValidation } from '~/validations/uploadEbook';

function UploadEbook() {
    const titleId = useId();
    const [languages, setLanguages] = useState([]);
    const [{ title, languageId }, setEbook] = useState({
        title: '',
        languageId: '',
    });
    const [chapters, setChapters] = useReducer(chapterReducer, initChapter);

    const handleChangeEbook = (object) => {
        setEbook((pre) => ({ ...pre, ...object }));
    };

    const handleUploadFile = (file, index) => {
        setChapters({
            key: FILE,
            payload: {
                index,
                value: [file],
            },
        });
    };

    const handleRemoveFile = (index) => {
        setChapters({
            key: FILE,
            payload: {
                index,
                value: [],
            },
        });
    };

    const handleUpload = async () => {
        try {
            const ebook = await ebookValidation.validate({ title: title, languageId: languageId });
            const chapterValidations = [];
            for (const chapter of chapters) {
                chapterValidations.push(
                    chapterValidation.validate({ title: chapter.title, fileName: chapter.file[0]?.name }),
                );
            }
            await Promise.all(chapterValidations);
        } catch (error) {
            if (error.name === 'ValidationError') {
                alert(error.message);
            }
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
                            onClick={() =>
                                setChapters({
                                    key: REMOVECHAPTER,
                                    payload: {
                                        index,
                                    },
                                })
                            }
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
                                        setChapters({
                                            key: TITLE,
                                            payload: {
                                                index,
                                                value: e.target.value,
                                            },
                                        });
                                    }}
                                    placeholder="Add chapter name"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div>
                            <Upload
                                onRemove={() => handleRemoveFile(index)}
                                beforeUpload={(file) => handleUploadFile(file, index)}
                                fileList={item.file}
                            >
                                <Button icon={<IoCloudUploadOutline />}>Upload</Button>
                            </Upload>
                        </div>
                    </div>
                </div>
            ))}
            <div className="space-x-4">
                <ButtonCustom
                    onClick={() => {
                        setChapters({ key: ADDCHAPTER, payload: null });
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