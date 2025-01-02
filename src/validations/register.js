import * as Yup from 'yup';

const registerValidation = Yup.object({
    // Validation cho username: không được để trống và phải có ít nhất 3 ký tự
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),

    // Validation cho password: phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character'),

    // Validation cho confirmPassword: phải trùng với password
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default registerValidation;
