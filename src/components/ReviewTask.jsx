import { Button, Drawer, Space, Upload } from 'antd';
import { CiCalendarDate } from 'react-icons/ci';
import { LuSquareArrowUpLeft } from 'react-icons/lu';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import formatDay from '~/utils/formatDay';
import ButtonCustom from '~/components/Button';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getContent, getTaskInformation, uploadContent } from '~/utils/urlApi';
import { get, post } from '~/db';
import { TRANSLATE } from '~/utils/taskCategory';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { uploadContentValidation } from '~/validations/uploadEbook';

function ReviewTask({ setOpen, open, taskId, done }) {
    const onClose = () => {
        setOpen(false);
    };
    const [dataSource, setDataSource] = useState({});
    const [content, setContent] = useState('');
    const [translationFile, setTranslationFile] = useState([]);

    useEffect(() => {
        (async () => {
            if (taskId && open) {
                try {
                    const [resTask, resContent] = await Promise.all([
                        get(`${getTaskInformation}/${taskId}`),
                        get(`${getContent}/${taskId}`),
                    ]);

                    const dataContent = resContent?.data?.data;

                    setDataSource({
                        ...resTask.data.data,
                        contentId: dataContent?.content_id || null,
                    });

                    if (dataContent) {
                        setContent(dataContent.content);
                    }
                } catch {
                    alert('Failed to get data');
                }
            }
        })();
    }, [taskId, open]);

    const handleTranslation = async (status = false) => {
        try {
            const isAllow = uploadContentValidation(taskId, translationFile, content);
            if (!isAllow || done) return;
            let formData = new FormData();
            if (translationFile.length > 0) {
                formData.append('task_id', taskId);
                formData.append('file_content', translationFile[0]);
            } else {
                formData.append('task_id', taskId);
                formData.append('content', content);
            }
            status && formData.append('status', status);
            const res = await post(uploadContent, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });
            if (res.status === 201) {
                setContent(res.data.data.content);
                alert('Successfully uploaded');
                setTranslationFile([]);
            }
        } catch (error) {
            alert('Failed to save translation');
        }
    };

    const handleSaveTrans = async () => {
        handleTranslation(false);
    };

    const handleCompletedTrans = async () => {
        handleTranslation(true);
    };

    return (
        <Drawer
            width={'50%'}
            onClose={onClose}
            open={open}
            title={
                <Link>
                    <LuSquareArrowUpLeft className="text-xl" />
                </Link>
            }
        >
            <div className="space-y-4">
                <h1 className="text-2xl">{dataSource?.chapter_title}</h1>
                <p className="flex space-x-2 opacity-70">
                    <TbWorld className="text-xl " />
                    <span>{dataSource.language}</span>
                </p>
                <p className="text-green flex space-x-2">
                    <CiCalendarDate className="text-xl" />
                    <h2>{formatDay(new Date())}</h2>
                </p>
                <p className="flex">
                    <Tag
                        title={dataSource?.type}
                        color={dataSource?.type === TRANSLATE ? 'bg-translate' : 'bg-review'}
                    />
                </p>
                <p className="flex space-x-4 items-center">
                    <span className="opacity-70">{dataSource.language}</span>
                    <FaLongArrowAltRight className="text-xl opacity-70" />
                    <span>Vietnamese</span>
                </p>
                <div className="flex h-[550px]">
                    <div className="overflow-hidden flex-1 space-y-2 justify-between items-center m-3">
                        <h2 className="text-[20px]">Content</h2>
                        <p className="h-[500px] overflow-y-auto">{dataSource?.content}</p>
                    </div>
                    <hr class="bg-gray-300 w-[1px] h-[80%] m-auto"></hr>
                    <div className=" flex-1 space-y-2 m-3">
                        <h2 className="text-[20px]">Translate</h2>
                        <textarea
                            placeholder="Add your transcript"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                            className="w-full h-[500px] resize-none focus-visible:outline-none"
                        ></textarea>
                    </div>
                </div>
                <div className="flex items-start space-x-3 h-[70px]">
                    <h2 className="text-base">Upload Translation:</h2>
                    <Upload
                        onRemove={() => {
                            setTranslationFile([]);
                        }}
                        beforeUpload={(e) => {
                            console.log(e);
                            setTranslationFile([e]);
                            return false;
                        }}
                        fileList={translationFile}
                    >
                        <Button icon={<IoCloudUploadOutline />}>Upload</Button>
                    </Upload>
                </div>
                <div className="space-x-4">
                    <ButtonCustom
                        className={`${done ? 'opacity-45 cursor-not-allowed' : ''}`}
                        onClick={handleSaveTrans}
                        blue
                    >
                        Save
                    </ButtonCustom>
                    <ButtonCustom
                        className={`${done ? 'opacity-45 cursor-not-allowed' : ''}`}
                        onClick={handleCompletedTrans}
                        green
                    >
                        Completed
                    </ButtonCustom>
                </div>
            </div>
        </Drawer>
    );
}

export default ReviewTask;
