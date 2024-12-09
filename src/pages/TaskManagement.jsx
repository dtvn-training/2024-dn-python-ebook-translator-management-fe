import { useReducer } from 'react';
import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';
import { initState, inputReducer } from '~/routes/inputReducer';

const arr = new Array(23).fill(null);

function TaskManagement() {
    const [state, dispatch] = useReducer(inputReducer, initState);

    return (
        <div className="space-y-6">
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <InputBasic state={state} dispatch={dispatch} />
            </div>
            <div className="grid grid-cols-2 gap-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3">
                {arr.map((item, index) => (
                    <div className="space-y-1" key={index}>
                        <Card
                            title={'Doremon va nhung nguoi ban'}
                            author={'Nguyen Thanh An'}
                            deadline={'01/01/2025'}
                            language={'English'}
                            type={'Translate'}
                            to=""
                            button={'Review'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskManagement;
