import dayjs from 'dayjs';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';
import { get } from '~/db';
import { REGISTER_TASK_DETAIL } from '~/utils/constants';
import formatDay from '~/utils/formatDay';
import { initState, inputReducer } from '~/utils/inputReducer';
import { toastError, toastInfo } from '~/utils/toastConfig';
import { taskRegister } from '~/utils/urlApi';
import { isCallApi, limit } from '~/utils/paginate';

function RegisterTask() {
    const [state, dispatch] = useReducer(inputReducer, initState);
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const handleFindTask = async () => {
        try {
            const res = await get(taskRegister(state.title, state.type, state.language, currentPage, limit));
            if (res.status === 200 && res.statusText == 'OK' && res.data) {
                if (res.data.length < limit) {
                    setHasMore(false);
                }
                setTasks((pre) => [...pre, ...res.data]);
            }
        } catch (error) {
            toastError('Failed to find task');
        }
    };

    const handleRegistration = async (task) => {
        navigate(`${REGISTER_TASK_DETAIL}/${task.task_id}`, { state: task });
    };

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (isCallApi(container) && hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    // load tasks
    useEffect(() => {
        handleFindTask();
    }, [currentPage]);

    return (
        <div className="space-y-6">
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <InputBasic isLanguage handleFind={handleFindTask} state={state} dispatch={dispatch} />
            </div>
            <div
                ref={containerRef}
                className="grid grid-cols-2 gap-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 max-h-[75vh] overflow-y-scroll"
            >
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
