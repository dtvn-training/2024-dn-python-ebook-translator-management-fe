import Tag from './Tag';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { CiCalendarDate } from 'react-icons/ci';
import formatDay from '~/utils/formatDay';
import ReviewTask from './ReviewTask';
import { useState } from 'react';
import { isOver } from '~/utils/deadline';

function Task({ tag, title, language, deadline, color, taskId, done = false }) {
    const [showDrawer, setShowDrawer] = useState(false);
    return (
        <div className="px-4 py-3 rounded-lg shadow-md bg-task space-y-2">
            <div className="flex justify-between">
                <Tag title={tag} color={color} />
                <button
                    onClick={() => {
                        setShowDrawer(true);
                    }}
                >
                    <BsArrowUpRightCircle className="text-xl" />
                </button>
            </div>
            <h2 className="text-lg truncate font-medium">{title}</h2>
            <p className="flex space-x-2 opacity-70">
                <TbWorld className="text-xl " />
                <span>{language}</span>
            </p>
            <p className={`${isOver(deadline) ? 'text-red-500' : 'text-green'} flex space-x-2`}>
                <CiCalendarDate className="text-xl" />
                <h2>{formatDay(deadline)}</h2>
            </p>
            <ReviewTask done={done} taskId={taskId} setOpen={setShowDrawer} open={showDrawer} />
        </div>
    );
}

export default Task;
