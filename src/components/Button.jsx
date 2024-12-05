import { useEffect, useState } from 'react';

function Button({ children, className, to, white, green, blue }) {
    const bgWhite = '!bg-white ';
    const bgGreen = '!bg-green-500 ';
    const bgBlue = '!bg-blue-200 ';
    let style = 'bg-default_bt px-4 py-1 rounded-lg hover:opacity-60 ';
    white && (style += bgWhite);
    green && (style += bgGreen);
    blue && (style += bgBlue);
    style += className;
    const [Type, setType] = useState('button');
    useEffect(() => {
        to && setType('Link');
    }, [to]);
    return (
        <Type to className={style}>
            {children}
        </Type>
    );
}

export default Button;
