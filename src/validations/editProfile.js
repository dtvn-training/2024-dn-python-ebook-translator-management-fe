import * as Yup from 'yup';

export const editProfileValidation = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .nullable() // Allow null value
        .notRequired(), // Make it optional
    phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits') // Regex for phone number validation
        .nullable() // Allow null value
        .notRequired(), // Make it optional
});
