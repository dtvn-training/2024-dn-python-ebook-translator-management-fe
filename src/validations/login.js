import * as Yup from 'yup';

const loginValidation = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default loginValidation;
