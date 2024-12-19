import { Button, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import ViewComment from '~/components/ViewComment';
import ButtonCustom from '~/components/Button';
import { useParams } from 'react-router-dom';
import { get, post } from '~/db';
import { confirmComment, getComment, getContent, getTaskInformation, uploadContent } from '~/utils/urlApi';
import { toastError, toastInfo, toastSuccess } from '~/utils/toastConfig';
import formatDay from '~/utils/formatDay';
import { uploadContentValidation } from '~/validations/uploadEbook';
import { optionAuth, optionFormAndAuth } from '~/utils/optionFormData';

function TranscriptTask() {
    const { task_id } = useParams();
    const [translationFile, setTranslationFile] = useState([]);
    const [comments, setComments] = useState([]);
    const [taskInformation, setTaskInformation] = useState({
        chapter_title: '',
        deadline: '',
        language: '',
        task_id: '',
        type: '',
        content: '',
    });
    const [content, setContent] = useState('');
    useEffect(() => {
        (async () => {
            try {
                const [resTask, resContent, resComment] = await Promise.all([
                    get(`${getTaskInformation}/${task_id}`),
                    get(`${getContent}/${task_id}`),
                    get(`${getComment}/${task_id}`),
                ]);
                if (resContent.status === 200) {
                    setContent(resContent.data.data.content);
                }
                if (resTask.status === 200) {
                    setTaskInformation(resTask.data.data);
                }
                if (resComment.status === 200) {
                    setComments(resComment.data?.data || []);
                }
            } catch (error) {
                toastInfo('Dont find task information');
            }
        })();
    }, [task_id]);

    const handleSaveTrans = async () => {
        try {
            const isAllow = uploadContentValidation(task_id, translationFile, content);
            if (!isAllow) return;
            let formData = new FormData();
            if (translationFile.length > 0) {
                formData.append('task_id', task_id);
                formData.append('file_content', translationFile[0]);
            } else {
                formData.append('task_id', task_id);
                formData.append('content', content);
            }
            const res = await post(uploadContent, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });
            if (res.status === 201) {
                setContent(res.data.data.content);
                toastSuccess('Successfully uploaded');
                setTranslationFile([]);
            }
        } catch (error) {
            toastInfo('Failed to save translation');
        }
    };

    const handleConfirmComment = async (commentId) => {
        try {
            const res = await post(
                confirmComment,
                {
                    comment_id: commentId,
                },
                optionAuth,
            );
            if (res.status === 200) {
                setComments(
                    comments.map((comment) =>
                        comment.comment_id === commentId ? { ...comment, status: true } : comment,
                    ),
                );
                toastSuccess('Successfully confirmed comment');
            }
        } catch (error) {
            toastError('Failed to confirm comment');
        }
    };

    const handleCompletedTrans = async () => {
        try {
            const is_allow = uploadContentValidation(task_id, translationFile, content);
            if (!is_allow) return;
            let formData = new FormData();
            if (translationFile.length > 0) {
                formData.append('task_id', task_id);
                formData.append('file_content', translationFile[0]);
            } else {
                formData.append('task_id', task_id);
                formData.append('content', content);
            }
            formData.append('status', true);
            const res = await post(uploadContent, formData, optionFormAndAuth);
            if (res.status === 201) {
                setContent(res.data.data.content);
                toastSuccess('Successfully completed translation');
                setTranslationFile([]);
            }
        } catch (error) {
            toastInfo('Failed to upload content');
        }
    };

    return (
        <div className="space-y-2">
            <p>Chapter's name: {taskInformation.chapter_title}</p>
            <p>Language: {taskInformation.language}</p>
            <p>Type: {taskInformation.type}</p>
            <p>Deadline: {formatDay(taskInformation.deadline)}</p>
            <div className="flex h-[550px]">
                <div className="overflow-hidden flex-1 space-y-2 justify-between items-center m-3">
                    <h2 className="text-[20px]">Content</h2>
                    <p className="h-[500px] overflow-y-auto">{taskInformation.content}</p>
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
                        className="w-full h-[500px] resize-none"
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
                        setTranslationFile([e]);
                        return false;
                    }}
                    fileList={translationFile}
                >
                    <Button icon={<IoCloudUploadOutline />}>Upload</Button>
                </Upload>
            </div>
            <div className="space-y-4 xl:w-1/2">
                <h2 className="text-xl">Comment</h2>
                <div className="pl-2 space-y-4">
                    {comments.map((item, i) => (
                        <ViewComment
                            author={`${item.fullname} - ${item.role}`}
                            content={item.content}
                            isComfirm={item.status}
                            onClick={() => handleConfirmComment(item.comment_id)}
                        />
                    ))}
                </div>
            </div>
            <div className="pt-5 space-x-4">
                <ButtonCustom onClick={handleSaveTrans} blue>
                    Save
                </ButtonCustom>
                <ButtonCustom onClick={handleCompletedTrans} green>
                    Completed
                </ButtonCustom>
            </div>
        </div>
    );
}

export default TranscriptTask;
