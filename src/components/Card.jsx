import { Card as CardAnt } from 'antd';
import { Link } from 'react-router-dom';
import Button from './Button';

function Card({ title, language, deadline, type, author, to = '', button }) {
    return (
        <CardAnt>
            <h1 className="truncate">{title}</h1>
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
            <Button className={'mt-2'} to={to}>
                {button}
            </Button>
        </CardAnt>
    );
}

export default Card;
