import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import { get, post } from '~/db';
import { DOWLOADN_FILE } from '~/utils/constants';
import formatDay from '~/utils/formatDay';

function RegisterTaskDetail() {
    const taskId = useParams().task_id;
    const task = useLocation().state;
    const [chapter, setChapter] = useState({
        chapter_id: '',
        content: '',
        filename: '',
    });

    // xu ly dang ky task
    const handleRegisterTask = async () => {
        try {
            // call api
        } catch (error) {}
    };

    useEffect(() => {
        (async () => {
            const res = await get('/chapter/content/' + task.chapter_id);
            if (res.status === 200 && res.statusText === 'OK') {
                setChapter(res.data);
            }
        })();
    }, [taskId]);

    return (
        <div>
            <h1 className="font-bold text-[20px] mb-2">Task Detail</h1>
            <div className="space-y-2">
                <p className="text-[1rem]">Chapter’s name: {task.chapter_title}</p>
                <p className="text-[1rem]">Language: {task.language}</p>
                <p className="text-[1rem]">Type: {task.type}</p>
                <p className="text-[1rem]">Deadline: {formatDay(task.deadline)}</p>
                <p className="text-[1rem]">Salary: {task.salary} VND</p>
                <div>
                    <h4 className="text-[1rem]">Short content:</h4>
                    <p className="ml-10">{chapter.content}</p>
                </div>
                <p className="text-[1rem]">
                    Download chapter:{' '}
                    <Link to={`${DOWLOADN_FILE}/${chapter.filename}`} className="underline italic">
                        Click_here
                    </Link>
                </p>
                <Button onClick={handleRegisterTask}>Registrations</Button>
            </div>
        </div>
    );
}

export default RegisterTaskDetail;
