import { Card as CardAnt, Tooltip } from 'antd';
import Button from './Button';
import { memo } from 'react';

function Card({ title, language, deadline, type, author, to = '', button }) {
    const isOverDeadline = new Date().getTime() > new Date(deadline).getTime();

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
            <p className="truncate">
                Author: <span>{author}</span>
            </p>
            <Button white={isOverDeadline} className={`mt-2`} to={to}>
                {button}
            </Button>
        </CardAnt>
    );
}

export default memo(Card);
