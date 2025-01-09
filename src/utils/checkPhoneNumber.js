export const isPhoneNumber = (value) => {
    const number = +value;
    return Number.isInteger(number) && number >= 0 && value.length <= 15;
};
