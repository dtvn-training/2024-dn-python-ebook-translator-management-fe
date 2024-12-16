function TranscriptTask() {
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
        </div>
    );
}

export default TranscriptTask;
