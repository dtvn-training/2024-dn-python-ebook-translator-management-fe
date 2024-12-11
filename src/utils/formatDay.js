import dayjs from 'dayjs';

function formatDay(date) {
    return date ? dayjs(date).format('MM/DD/YYYY') : '';
}

export default formatDay;
