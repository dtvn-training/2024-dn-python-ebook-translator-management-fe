import { Avatar, Tooltip } from 'antd';
import { CiCircleCheck } from 'react-icons/ci';
import Button from './Button';

function ViewComment({ author, content, isComfirm = false, onClick }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex space-x-3 ">
                <div className="w-[40px]">
                    <Avatar size={40}>User</Avatar>
                </div>
                <div className="">
                    <h2 className="font-medium">{author}</h2>
                    <Tooltip color="white" title={<p className="text-black">{content}</p>}>
                        <p className=" line-clamp-1">{content}</p>
                    </Tooltip>
                </div>
            </div>
            <div className="min-w-[20px]">
                {isComfirm ? (
                    <CiCircleCheck className="text-3xl text-green-500" />
                ) : (
                    <Button onClick={onClick} green>
                        Confirm
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ViewComment;
