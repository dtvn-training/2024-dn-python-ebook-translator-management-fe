export const formatMoney = (money) => {
    const formattedMoneyVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(money);
    return formattedMoneyVND;
};
