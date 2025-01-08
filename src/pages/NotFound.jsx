import { Link } from 'react-router-dom';
import { HOME_PAGE } from '~/utils/constants';
import image from '~/public/image/not_found.png';
import classNames from 'classnames/bind';
import styles from '~/styles/notFound.module.scss';

const labels = [
    {
        key: 1,
        label: 'Home',
        href: HOME_PAGE,
    },
    {
        key: 2,
        label: 'Products',
        href: '/products',
    },
    {
        key: 3,
        label: 'About Us',
        href: '/about',
    },
    {
        key: 4,
        label: 'Contact Us',
        href: '/contact',
    },
];

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className="bg-not_found w-full h-[100vh] px-2 lg:px-10  xl:px-20 py-10">
            <div className="flex justify-between items-center">
                <h2 className="text-white text-2xl">Translation</h2>
                <ul className="space-x-3 md:flex hidden md:space-x-6 xl:space-x-16">
                    {labels.map((item) => (
                        <li key={item.key} className={`${cx('label-underline')} text-white`}>
                            <Link to={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="space-x-4">
                    <Link className="text-white underline hover:opacity-55">Sign In</Link>
                    <Link className="text-white inline-block px-8 rounded-2xl py-2 bg-button_404 hover:opacity-55">
                        Sign Up
                    </Link>
                </div>
            </div>
            <div className="flex items-end justify-evenly h-3/4">
                <div className="relative">
                    <h2 className="bg-gradient-to-b from-text_404_0 to-text_404_100 xl:text-[300px] text-[200px] font-extrabold bg-clip-text text-transparent absolute -top-[160px] xl:-top-[250px] left-1/2 -translate-x-1/2">
                        404
                    </h2>
                    <div className="space-y-4 z-10 relative">
                        <h3 className="text-white text-center text-[40px] xl:text-[60px]">
                            OOOps! <span className="block text-center">Page Not Found</span>
                        </h3>
                        <p className="text-wrap text-white text-xl text-center">
                            Sorry about that! Please visit our homepage <br /> to get where you need to go.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white bg-button_404 px-6 py-2 rounded-2xl text-sm transition-all hover:-translate-y-[1px] hover:shadow-lg">
                                Go to back
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${cx('image-animation')} md:block hidden w-[400px] xl:w-[500px]`}>
                    <img className="block w-full" src={image} />
                </div>
            </div>
            <ul className="space-x-3 md:hidden justify-center mt-5 flex items-end md:space-x-6 xl:space-x-16 ">
                {labels.map((item) => (
                    <li key={item.key} className={`${cx('label-underline')} text-white`}>
                        <Link to={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotFound;
