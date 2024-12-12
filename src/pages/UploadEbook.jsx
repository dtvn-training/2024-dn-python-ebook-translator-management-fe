import { Button, Input, Select, Upload } from 'antd';
import { useEffect, useId, useState } from 'react';
import { get } from '~/db';
import { getLanguage } from '~/utils/urlApi';
import { IoCloudUploadOutline } from 'react-icons/io5';
import ButtonCustom from '~/components/Button';

function UploadEbook() {
    const titleId = useId();
    const [languages, setLanguages] = useState([]);
    const [fileList, setFileList] = useState([]);

    const handleUploadFile = (file) => {
        setFileList([file]);
    };

    const handleRemoveFile = () => {
        setFileList([]);
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
                    <Input placeholder="Add ebook name" type="text" id={titleId} />
                </div>
                <div className="space-y-1">
                    <label className="text-[16px] block">Language:</label>
                    <Select
                        className="!w-[200px]"
                        defaultValue={''}
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
            <div className="space-y-2">
                <h1 className="font-medium text-[16px] ">Chapter 1</h1>
                <div className="space-y-4">
                    <div>
                        <div className="space-y-1">
                            <label className="text-[16px]">Title:</label>
                            <Input placeholder="Add chapter name" type="text" />
                        </div>
                    </div>
                    <div>
                        <Upload onRemove={handleRemoveFile} beforeUpload={handleUploadFile} fileList={fileList}>
                            <Button icon={<IoCloudUploadOutline />}>Upload</Button>
                        </Upload>
                    </div>
                </div>
            </div>
            <div className='space-x-4'>
                <ButtonCustom blue>Add chapter</ButtonCustom>
                <ButtonCustom green>Upload</ButtonCustom>
            </div>
        </div>
    );
}

export default UploadEbook;
