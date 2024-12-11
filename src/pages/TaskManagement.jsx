import dayjs from 'dayjs';
import { useEffect, useReducer, useState } from 'react';
import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';
import { get } from '~/db';
import { REVIEW_TASK } from '~/utils/constrains';
import formatDay from '~/utils/formatDay';
import { initState, inputReducer } from '~/utils/inputReducer';
import { taskManagementUrl } from '~/utils/urlApi';

function TaskManagement() {
    const [state, dispatch] = useReducer(inputReducer, initState);
    const [tasks, setTasks] = useState([]);

    const handleFindTask = async () => {
        try {
            const deadline = formatDay(state.date);
            const res = await get(taskManagementUrl(state.title, deadline, state.type));
            if (res.status === 200 || res.statusText == 'OK') {
                setTasks(res.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        handleFindTask();
    }, []);

    return (
        <div className="space-y-6">
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <InputBasic handleFind={handleFindTask} state={state} dispatch={dispatch} />
            </div>
            <div className="grid grid-cols-2 gap-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3">
                {tasks.map((item, index) => (
                    <div className="space-y-1" key={index}>
                        <Card
                            title={item.chapter_title}
                            author={item.author}
                            deadline={formatDay(item.deadline)}
                            language={item.language}
                            type={item.type}
                            to={`${REVIEW_TASK}/${item.task_id}`}
                            button={'Review'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskManagement;
