import dayjs from 'dayjs';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';
import { get } from '~/db';
import { REGISTER_TASK_DETAIL } from '~/utils/constants';
import formatDay from '~/utils/formatDay';
import { initState, inputReducer } from '~/utils/inputReducer';
import { taskRegister } from '~/utils/urlApi';

function RegisterTask() {
    const [state, dispatch] = useReducer(inputReducer, initState);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const handleFindTask = async () => {
        try {
            const res = await get(taskRegister(state.title, state.type, state.language));
            if (res.status === 200 && res.statusText == 'OK') {
                setTasks(res.data);
            }
        } catch (error) {}
    };

    const handleRegistration = async (task) => {
        navigate(`${REGISTER_TASK_DETAIL}/${task.task_id}`, { state: task });
    };

    // load tasks
    useEffect(() => {
        handleFindTask();
    }, []);

    return (
        <div className="space-y-6">
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <InputBasic isLanguage handleFind={handleFindTask} state={state} dispatch={dispatch} />
            </div>
            <div className="grid grid-cols-2 gap-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3">
                {tasks.map((item, index) => (
                    <div className="space-y-1" key={index}>
                        <Card
                            hasWarning={false}
                            title={item.chapter_title}
                            deadline={formatDay(item.deadline)}
                            language={item.language}
                            type={item.type}
                            salary={item.salary}
                            onClick={() => handleRegistration(item)}
                            button={'Registration'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RegisterTask;
