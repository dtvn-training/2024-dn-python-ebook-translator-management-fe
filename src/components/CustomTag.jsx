import { Tag } from 'antd';
import { COMPLETED, IN_PROGRESS, REVIEW, TRANSLATION } from '~/utils/status';

function CustomTag({ type }) {
    let color = 'error';
    if (type === COMPLETED) {
        color = 'success';
    }
    if (type === IN_PROGRESS || type === REVIEW) {
        color = 'processing';
    }
    if (type === TRANSLATION) {
        color = 'warning';
    }
    return <Tag color={color}>{type}</Tag>;
}

export default CustomTag;
