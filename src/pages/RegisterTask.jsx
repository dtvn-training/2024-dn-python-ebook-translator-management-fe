import dayjs from 'dayjs';
import { useReducer, useState } from 'react';
import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';
import { initState, inputReducer } from '~/utils/inputReducer';

function RegisterTask() {
    const [state, dispatch] = useReducer(inputReducer, initState);
    const [tasks, setTasks] = useState(new Array(10).fill(null));

    const handleFindTask = async () => {
        try {
            // Call API
        } catch (error) {}
    };

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
                            title={'item.chapter_title'}
                            deadline={dayjs(new Date()).format('MM/DD/YYYY')}
                            language={'item.language'}
                            type={'item.type'}
                            salary={100000}
                            to=""
                            button={'Review'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RegisterTask;
