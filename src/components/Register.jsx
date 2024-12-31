import { useState } from 'react';
import Input from './Input';
import { FaGoogle } from 'react-icons/fa';
import { CiFacebook } from 'react-icons/ci';
import registerValidation from '~/validations/register';
import { post } from '~/db';

function Register({ setShowContainer, LOGIN }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const value = await registerValidation.validate({
                username: username,
                password: password,
                confirmPassword: confirmPassword,
            });
            const res = await post('/user/register', {
                username: value.username,
                password: value.password,
                confirm_password: value.confirmPassword,
            });
            if (res.status === 201) {
                alert(res.data.message);
                setShowContainer(LOGIN);
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
        <form onSubmit={handleSubmit} className="py-10 px-2 space-y-5">
            <h1 className="text-center text-xl">Sign Up</h1>
            <div className="flex justify-center">
                <Input value={username} setValue={setUsername} placeholder={'Add your email or phone number'} />
            </div>
            <div className="flex justify-center">
                <Input type="password" value={password} setValue={setPassword} placeholder={'Add your password'} />
            </div>
            <div className="flex justify-center">
                <Input
                    type="password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    placeholder={'Confirm your password'}
                />
            </div>
            <div className="flex justify-center">
                <button className="text-white mt-3 bg-[#5FB5B8] w-[150px] rounded-md p-1 hover:opacity-60">
                    Sign up
                </button>
            </div>
            <div>
                <h4 className="text-center mb-2">Other</h4>
                <div className="flex justify-center space-x-2 items-center">
                    <span className="opacity-55">
                        <FaGoogle className="text-3xl" />
                    </span>
                    <span className="opacity-55">
                        <CiFacebook className="text-3xl" />
                    </span>
                </div>
                <div
                    onClick={() => {
                        setShowContainer(LOGIN);
                    }}
                    className="flex justify-center"
                >
                    <button type="submit" className="text-center mt-3 text-sky-500 italic">
                        Go to sign in
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Register;
