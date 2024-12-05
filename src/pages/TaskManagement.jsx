import Card from '~/components/Card';
import InputBasic from '~/components/InputBasic';

const arr = new Array(23).fill(null);

function TaskManagement() {
    return (
        <div className="space-y-6">
            <div className="w-[80%] border border-black m-auto px-4 py-6 rounded-xl space-y-3">
                <InputBasic />
            </div>
            <div className="flex-wrap flex gap-4 justify-center">
                {arr.map((item, index) => (
                    <div className="w-[250px] space-y-1">
                        <Card
                            key={index}
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
