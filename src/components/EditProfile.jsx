import { Avatar, Button, Input } from 'antd';
import { useId, useMemo, useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { isPhoneNumber } from '~/utils/checkPhoneNumber';
import { isEmail } from '~/utils/isEmail';
import { editProfileValidation } from '~/validations/editProfile';
function EditProfile({ setShowProfile }) {
    const [{ avatar, email, name, phone }, setProfile] = useState({
        name: null,
        email: null,
        phone: null,
        avatar: null,
    });
    const inputFileId = useId();
    const containerRef = useRef(null);
    const [isEmailError, setIsEmailError] = useState(false);

    const handleChangeAvatar = (e) => {
        const avatar = e.target.files[0];
        setProfile((prev) => ({ ...prev, avatar: avatar }));
    };

    const handleRemoveAvatar = () => {
        setProfile((prev) => ({ ...prev, avatar: null }));
    };

    const isUpdate = useMemo(() => {
        return (avatar || email || name || phone) && !isEmailError;
    }, [avatar, email, name, phone]);

    const handleClickOutside = (e) => {
        setShowProfile(e.target !== containerRef.current);
    };

    const handleChangePhoneNumber = (e) => {
        const value = e.target.value;
        if (isPhoneNumber(value)) setProfile((prev) => ({ ...prev, phone: e.target.value }));
    };
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (isEmail(value)) {
            setIsEmailError(false);
        } else {
            setIsEmailError(true);
        }
        setProfile((prev) => ({ ...prev, email: e.target.value }));
    };

    const handleSubmit = async (e) => {
        try {
            const value = await editProfileValidation.validate({
                email: email,
                phone: phone,
            });
            // todo: call api to edit profile
        } catch (error) {
            if (error.name === 'ValidationError') {
                alert(error.message);
                return;
            }
        }
    };

    return (
        <div
            onClick={handleClickOutside}
            className="w-full h-[100vh] bg-[rgba(0,0,0,0.3)] z-50 fixed flex items-center"
            ref={containerRef}
        >
            <div className="overflow-hidden rounded-2xl bg-white w-[500px] m-auto px-10 py-10">
                <div className="flex items-center space-x-2 border-b pb-1">
                    <h1 className="text-lg">Edit profile</h1>
                    <span className="text-2xl">
                        <CiEdit />
                    </span>
                </div>
                <div className="pt-4 space-y-4">
                    <div>
                        <h4 className="text-base opacity-80">Profile picture</h4>
                        <div className="space-x-8 mt-2 flex items-center">
                            <Avatar size={70} src={avatar ? URL.createObjectURL(avatar) : null} />
                            <input onChange={handleChangeAvatar} id={inputFileId} type="file" className="hidden" />
                            <div className="space-x-4 flex ">
                                <label
                                    className="block bg-blue-500 rounded-md px-2 cursor-pointer text-center h-[32px] leading-[32px] text-white text-sm"
                                    htmlFor={inputFileId}
                                    type="primary"
                                >
                                    Change picture
                                </label>
                                <Button onClick={handleRemoveAvatar} type="default" className="text-red-600">
                                    Delete picture
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Profile name</label>
                        <Input
                            value={name}
                            onChange={(e) => {
                                setProfile((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="h-[40px]"
                            placeholder="Add your name"
                        />
                    </div>
                    <div>
                        <label>Username</label>
                        <Input size="large" addonBefore={'@'} value="Nguyenthanhan" disabled />
                        <p className="text-sm opacity-60 italic mt-1">Created in 12/12/2024</p>
                    </div>
                    <div>
                        <label>Email</label>
                        <Input
                            value={email}
                            onChange={handleChangeEmail}
                            className="h-[40px]"
                            placeholder="Add your email"
                        />
                        {<p className="text-red-500 h-[16px]">{isEmailError && 'Email is invalid'}</p>}
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <label>Phone number</label>
                            <Input
                                value={phone}
                                onChange={handleChangePhoneNumber}
                                className="h-[40px]"
                                placeholder="Add your phone number"
                            />
                        </div>
                        <div className="w-1/5">
                            <label>Level</label>
                            <Input className="h-[40px]" placeholder="Begin" disabled />
                        </div>
                        <div className="w-1/4">
                            <label>Total task</label>
                            <Input className="h-[40px] text-center" placeholder="3" disabled />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-6">
                    <Button
                        onClick={handleSubmit}
                        type={isUpdate ? 'primary' : 'default'}
                        disabled={!isUpdate}
                        className="w-[150px]"
                    >
                        Save changes
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
