import { useState } from 'react';
import Input from './Input';
import { FaGoogle } from 'react-icons/fa';
import { CiFacebook } from 'react-icons/ci';
import { Checkbox } from 'antd';
import loginValidation from '~/validations/login';
import { post } from '~/db';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE } from '~/utils/constants';

function Login({ setShowContainer, REGISTER }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlSubmit = async (e) => {
        try {
            e.preventDefault();
            const value = await loginValidation.validate({
                username: username,
                password: password,
            });
            const res = await post('/user/login', {
                username: value.username,
                password: value.password,
            });
            if (res.status === 200) {
                alert('Login successfully');
                const data = res.data.data;
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('profile', data.user.profile_id);
                localStorage.setItem('user', data.user.user_id);
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                navigate(HOME_PAGE);
            }
        } catch (error) {
            if (error?.name === 'ValidationError') {
                alert(error.message);
            }
            if (error.status === 400) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <form onSubmit={handlSubmit} className="py-10 px-2">
            <h1 className="text-center text-xl">Sign In</h1>
            <div className="flex justify-center mt-6">
                <Input value={username} setValue={setUsername} placeholder={'Add your email or phone number'} />
            </div>
            <div className="flex justify-center mt-6">
                <Input type="password" value={password} setValue={setPassword} placeholder={'Add your password'} />
            </div>
            <div className="w-[350px] m-auto flex justify-between mt-1">
                <div className="space-x-1 text-sm">
                    <Checkbox />
                    <span>Remember</span>
                </div>
                <button className="text-sm">Forgot password?</button>
            </div>
            <div className="flex justify-center mt-6">
                <button className="text-white mt-3 bg-[#5FB5B8] w-[150px] rounded-md p-1 hover:opacity-60">
                    Sign In
                </button>
            </div>
            <div>
                <h4 className="text-center mb-2 mt-3">Other</h4>
                <div className="flex justify-center space-x-2 items-center">
                    <span className="opacity-55">
                        <FaGoogle className="text-3xl" />
                    </span>
                    <span className="opacity-55">
                        <CiFacebook className="text-3xl" />
                    </span>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            setShowContainer(REGISTER);
                        }}
                        className="text-center mt-3 text-sky-500 italic"
                    >
                        Go to sign up
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;
