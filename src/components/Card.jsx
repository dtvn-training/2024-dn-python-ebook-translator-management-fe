import { Card as CardAnt, Tooltip } from 'antd';
import Button from './Button';
import { memo } from 'react';
import { formatMoney } from '~/utils/formatMoney';

function Card({ title, language, deadline, type, author, to = '', button, salary, hasWarning = true, onClick }) {
    const isOverDeadline = new Date().getTime() > new Date(deadline).getTime() && hasWarning;

    return (
        <CardAnt className={`${isOverDeadline ? 'bg-red-400' : ''}`}>
            <Tooltip color="white" title={<p className="text-black">{title}</p>}>
                <h1 className="truncate">{title}</h1>
            </Tooltip>
            <p>
                Language: <span>{language}</span>
            </p>
            <p>
                Deadline: <span>{deadline}</span>
            </p>
            <p>
                Type: <span>{type}</span>
            </p>
            {author && (
                <p className="truncate">
                    Author: <span>{author}</span>
                </p>
            )}
            {salary && <p>Salary: {formatMoney(salary)}</p>}
            <Button onClick={onClick} white={isOverDeadline} className={`mt-2`} to={to}>
                {button}
            </Button>
        </CardAnt>
    );
}

export default memo(Card);
