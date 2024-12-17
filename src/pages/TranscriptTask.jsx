import { Button, Upload } from 'antd';
import { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import ViewComment from '~/components/ViewComment';
import ButtonCustom from '~/components/Button';

function TranscriptTask() {
    const [translationFile, setTranslationFile] = useState([]);
    return (
        <div className="space-y-2">
            <p>Chapter's name: Pokemon</p>
            <p>Language: English</p>
            <p>Type: Translate</p>
            <p>Deadline: 01/01/2025</p>
            <div className="flex h-[550px]">
                <div className="overflow-hidden flex-1 space-y-2 justify-between items-center m-3">
                    <h2 className="text-[20px]">Content</h2>
                    <p className="h-[500px] overflow-y-auto">
                        One day, Nobita, a clumsy and unlucky boy, meets Doraemon, a robotic cat from the 22nd century
                        sent by Nobita’s descendants to help him improve his future. Doraemon uses futuristic gadgets
                        like the Bamboo Copter and Anywhere Door to assist Nobita in his daily struggles, from failing
                        in school to being bullied by Gian and manipulated by Suneo. Despite having access to incredible
                        gadgets, Nobita’s misuse often leads to hilarious and chaotic situations. Together with his
                        friends—Shizuka, Gian, and Suneo—they go on extraordinary adventures, such as time traveling to
                        prehistoric eras, exploring alien worlds, or solving mysteries. Through their journeys, Nobita
                        learns important lessons about responsibility, courage, and the value of friendship. The story
                        blends humor, heartwarming moments, and thrilling adventures, captivating readers with its
                        imaginative and relatable tales. One day, Nobita, a clumsy and unlucky boy, meets Doraemon, a
                        robotic cat from the 22nd century sent by Nobita’s descendants to help him improve his future.
                        Doraemon uses futuristic gadgets like the Bamboo Copter and Anywhere Door to assist Nobita in
                        his daily struggles, from failing in school to being bullied by Gian and manipulated by Suneo.
                        Despite having access to incredible gadgets, Nobita’s misuse often leads to hilarious and
                        chaotic situations. Together with his friends—Shizuka, Gian, and Suneo—they go on extraordinary
                        adventures, such as time traveling to prehistoric eras, exploring alien worlds, or solving
                        mysteries. his daily struggles, from failing in school to being bullied by Gian and manipulated
                        by Suneo. Despite having access to incredible gadgets, Nobita’s misuse often leads to hilarious
                        and chaotic situations. Together with his friends—Shizuka, Gian, and Suneo—they go on
                        extraordinary adventures, such as time traveling to prehistoric eras, exploring alien worlds, or
                        solving mysteries.
                    </p>
                </div>
                <hr class="bg-gray-300 w-[1px] h-[80%] m-auto"></hr>
                <div className=" flex-1 space-y-2 m-3">
                    <h2 className="text-[20px]">Translate</h2>
                    <textarea placeholder="Add your transcript " className="w-full h-[500px] resize-none"></textarea>
                </div>
            </div>
            <div className="flex items-start space-x-3 h-[70px]">
                <h2 className="text-base">Upload Translation:</h2>
                <Upload
                    onRemove={() => {
                        setTranslationFile([]);
                    }}
                    beforeUpload={(e) => {
                        console.log(e);
                        setTranslationFile([e]);
                        return false;
                    }}
                    fileList={translationFile}
                >
                    <Button icon={<IoCloudUploadOutline />}>Upload</Button>
                </Upload>
            </div>
            <div className="space-y-4 xl:w-1/2">
                <h2 className="text-xl">Comment</h2>
                <div className="pl-2 space-y-4">
                    <ViewComment
                        author={'Nguyen Thanh An - manager'}
                        content={
                            'Can co mot vai chinh sua Can co mot vai chinh sua Can co mot vai chinh sua Can co mot vai chinh sua Can co mot vai chinh sua Can co mot vai chinh sua Can co mot vai chinh sua'
                        }
                        isComfirm={true}
                    />
                    <ViewComment
                        author={'Nguyen Thanh An - manager'}
                        content={'Can co mot vai chinh sua'}
                        isComfirm={false}
                    />
                </div>
            </div>
            <div className="pt-5 space-x-4">
                <ButtonCustom blue>Save</ButtonCustom>
                <ButtonCustom green>Completed</ButtonCustom>
            </div>
        </div>
    );
}

export default TranscriptTask;
