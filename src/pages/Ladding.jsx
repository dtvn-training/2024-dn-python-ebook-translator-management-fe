import { useRef, useState } from 'react';
import Login from '~/components/Login';
import Register from '~/components/Register';
import backgroup from '~/public/images/backgroup_lady_page.jpg';
import mainLadding from '~/public/images/main_lading_page.png';

const LOGIN = 'login';
const REGISTER = 'register';

function Ladding() {
    const [showContainer, setShowContainer] = useState(false);
    const containerRef = useRef(null);

    const handleClickOutside = (e) => {
        e.target === containerRef.current && setShowContainer(false);
    };

    return (
        <div
            style={{ backgroundImage: `url(${backgroup})`, backgroundSize: '100%' }}
            className="w-full h-[100vh] bg-no-repeat flex justify-center items-center"
        >
            <div className="space-y-2">
                <h1 className="text-white text-3xl">Welcome to the translation system!</h1>
                <img className="w-[500px] object-cover block" src={mainLadding} />
                <div className="space-x-10 flex justify-center">
                    <button
                        onClick={() => {
                            setShowContainer(LOGIN);
                        }}
                        className="text-white bg-[#5FB5B8] w-[150px] rounded-md p-1 hover:opacity-60"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={() => {
                            setShowContainer(REGISTER);
                        }}
                        className="text-white bg-[#5FB5B8] w-[150px] rounded-md p-1 hover:opacity-60"
                    >
                        Sign up
                    </button>
                </div>
            </div>
            {showContainer && (
                <div
                    ref={containerRef}
                    onClick={handleClickOutside}
                    style={{ background: 'rgba(217, 217, 217, 0.2)' }}
                    className="h-full w-full absolute flex items-center justify-center"
                >
                    <div className="w-[500px] z-50 h-auto bg-white rounded-2xl overflow-hidden">
                        {showContainer === LOGIN ? (
                            <Login setShowContainer={setShowContainer} LOGIN={LOGIN} REGISTER={REGISTER} />
                        ) : (
                            <Register setShowContainer={setShowContainer} LOGIN={LOGIN} REGISTER={REGISTER} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ladding;
