import { Button, Drawer, Space } from 'antd';
import { CiCalendarDate } from 'react-icons/ci';
import { LuSquareArrowUpLeft } from 'react-icons/lu';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import formatDay from '~/utils/formatDay';
import ButtonCustom from '~/components/Button';
import Tag from './Tag';
import { Link } from 'react-router-dom';

function ReviewTask({ setOpen, open, taskId }) {
    const onClose = () => {
        setOpen(false);
    };
    return (
        <Drawer
            width={'50%'}
            onClose={onClose}
            open={open}
            title={
                <Link>
                    <LuSquareArrowUpLeft className="text-xl" />
                </Link>
            }
        >
            <div className="space-y-4">
                <h1 className="text-2xl">Doraemon va nhung nguoi ban</h1>
                <p className="flex space-x-2 opacity-70">
                    <TbWorld className="text-xl " />
                    <span>English</span>
                </p>
                <p className="text-green flex space-x-2">
                    <CiCalendarDate className="text-xl" />
                    <h2>{formatDay(new Date())}</h2>
                </p>
                <p className="flex">
                    <Tag title="Translate" color={'bg-translate'} />
                </p>
                <p className="flex space-x-4 items-center">
                    <span className="opacity-70">English</span>
                    <FaLongArrowAltRight className="text-xl opacity-70" />
                    <span>Vietnamese</span>
                </p>
                <div className="flex h-[550px]">
                    <div className="overflow-hidden flex-1 space-y-2 justify-between items-center m-3">
                        <p className="h-[500px] overflow-y-auto">
                            One day, Nobita, a clumsy and unlucky boy, meets Doraemon, a robotic cat from the 22nd
                            century sent by Nobita’s descendants to help him improve his future. Doraemon uses
                            futuristic gadgets like the Bamboo Copter and Anywhere Door to assist Nobita in his daily
                            struggles, from failing in school to being bullied by Gian and manipulated by Suneo. Despite
                            having access to incredible gadgets, Nobita’s misuse often leads to hilarious and chaotic
                            situations. Together with his friends—Shizuka, Gian, and Suneo—they go on extraordinary
                            adventures, such as time traveling to prehistoric eras, exploring alien worlds, or solving
                            mysteries. Through their journeys, Nobita learns important lessons about responsibility,
                            courage, and the value of friendship. The story blends humor, heartwarming moments, and
                            thrilling adventures, captivating readers with its imaginative and relatable tales. One day,
                            Nobita, a clumsy and unlucky boy, meets Doraemon, a robotic cat from the 22nd century sent
                            by Nobita’s descendants to help him improve his future. Doraemon uses futuristic gadgets
                            like the Bamboo Copter and Anywhere Door to assist Nobita in his daily struggles, from
                            failing in school to being bullied by Gian and manipulated by Suneo. Despite having access
                            to incredible gadgets, Nobita’s misuse often leads to hilarious and chaotic situations.
                            Together with his friends—Shizuka, Gian, and Suneo—they go on extraordinary adventures, such
                            as time traveling to prehistoric eras, exploring alien worlds, or solving mysteries. his
                            daily struggles, from failing in school to being bullied by Gian and manipulated by Suneo.
                            Despite having access to incredible gadgets, Nobita’s misuse often leads to hilarious and
                            chaotic situations. Together with his friends—Shizuka, Gian, and Suneo—they go on
                            extraordinary adventures, such as time traveling to prehistoric eras, exploring alien
                            worlds, or solving mysteries.
                        </p>
                    </div>
                    <hr class="bg-gray-300 w-[1px] h-[80%] m-auto"></hr>
                    <div className=" flex-1 space-y-2 m-3">
                        <h2 className="text-[20px]">Translate</h2>
                        <textarea
                            placeholder="Add your transcript "
                            className="w-full h-[500px] resize-none focus-visible:outline-none"
                        ></textarea>
                    </div>
                </div>
                <div className="space-x-4">
                    <ButtonCustom blue>Save</ButtonCustom>
                    <ButtonCustom green>Completed</ButtonCustom>
                </div>
            </div>
        </Drawer>
    );
}

export default ReviewTask;
