import { Link } from 'react-router-dom';

function Button({ children, className, to, white, green, blue, ...props }) {
    const bgWhite = '!bg-white ';
    const bgGreen = '!bg-green-500 ';
    const bgBlue = '!bg-blue-200 ';
    let style = 'bg-default_bt hover:text-black px-4 py-1 rounded-lg hover:opacity-60 inline-block ';
    white && (style += bgWhite);
    green && (style += bgGreen);
    blue && (style += bgBlue);
    style += className;
    const Type = to ? Link : 'button';

    return (
        <Type to={to} {...props} className={style}>
            {children}
        </Type>
    );
}

export default Button;
