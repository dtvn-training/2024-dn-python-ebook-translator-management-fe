import dayjs from 'dayjs';
import { useEffect, useReducer, useRef, useState } from 'react';
import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';
import { get } from '~/db';
import { REVIEW_TASK } from '~/utils/constants';
import formatDay from '~/utils/formatDay';
import { initState, inputReducer } from '~/utils/inputReducer';
import { isCallApi, limit } from '~/utils/paginate';
import { toastError } from '~/utils/toastConfig';
import { taskManagementUrl } from '~/utils/urlApi';

function TaskManagement() {
    const [state, dispatch] = useReducer(inputReducer, initState);
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const [hasMore, setHasMore] = useState(true);

    const handleFindTask = async () => {
        try {
            const deadline = formatDay(state.date);
            const res = await get(taskManagementUrl(state.title, deadline, state.type, currentPage, limit));

            if (res.status === 200 && res.statusText == 'OK' && res.data?.data) {
                if (res.data.data.length < limit) {
                    setHasMore(false);
                }
                setTasks([...tasks, ...res.data.data]);
            }
        } catch (error) {
            toastError('Failed to find task');
        }
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

    useEffect(() => {
        handleFindTask();
    }, [currentPage]);

    return (
        <div className="space-y-6">
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <InputBasic handleFind={handleFindTask} state={state} dispatch={dispatch} />
            </div>
            <div
                ref={containerRef}
                className="grid grid-cols-2 gap-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 max-h-[75vh] overflow-y-auto"
            >
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
