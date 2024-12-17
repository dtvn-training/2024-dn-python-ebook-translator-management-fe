import React from 'react';
import { ContainerOutlined, LineChartOutlined, SolutionOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { FaAddressBook, FaRegBell } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { pathname } from '~/routes/pathname';
const { Header, Content, Sider } = Layout;

const sider = [
    {
        key: 1,
        label: <Link className="text-base">All Tasks</Link>,
        icon: <SolutionOutlined style={{ fontSize: '20px' }} />,
    },
    {
        key: 2,
        label: (
            <Link to={pathname.TASK_MANAGEMENT} className="text-base">
                Task management
            </Link>
        ),
        icon: <ContainerOutlined style={{ fontSize: '20px' }} />,
    },
    {
        key: 3,
        label: <Link className="text-base">Translation progress</Link>,
        icon: <LineChartOutlined style={{ fontSize: '20px' }} />,
    },
];
const LayoutComponet = ({ children }) => {
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className="bg-white"
            >
                <div className="flex justify-between w-full items-center">
                    <h1 className="text-lg font-medium">Translation System</h1>
                    <div className="flex items-center space-x-4">
                        <button className="text-2xl">
                            <FaRegBell />
                        </button>
                        <button className="text-2xl">
                            <FaAddressBook />
                        </button>
                        <Avatar size={30}>User</Avatar>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider
                    width={250}
                    style={{
                        background: 'white',
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            marginTop: '10px',
                        }}
                        items={sider}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: 'white',
                        }}
                    >
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    >
                        <div className="w-full bg-white flex justify-center py-6 ">
                            <div className="w-[80%] space-y-5">
                                <h1 className="text-base font-medium">Footer Overview</h1>
                                <p className="w-[60%] m-auto">
                                    The footer of the website is designed to provide essential links and contact
                                    information to help users navigate the site and connect with the organization. The
                                    structure is clean and clear to offer a smooth user experience.
                                </p>
                                <div className="flex justify-evenly">
                                    <div>
                                        <h3 className="font-medium">Navigation</h3>
                                        <ul>
                                            <li>
                                                <a href="#home">Home</a>
                                            </li>
                                            <li>
                                                <a href="#about">About Us</a>
                                            </li>
                                            <li>
                                                <a href="#what-we-do">What We Do</a>
                                            </li>
                                            <li>
                                                <a href="#to-the-power-of-10">To The Power of 10</a>
                                            </li>
                                            <li>
                                                <a href="#donate">Donate</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-medium">What We Do</h3>
                                        <ul>
                                            <li>Encouraging Testing</li>
                                            <li>Strengthening Advocacy</li>
                                            <li>Sharing Information</li>
                                            <li>Building Leadership</li>
                                            <li>Engaging with Global Fund</li>
                                            <li>Shining a Light</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-medium">Legal</h3>
                                        <ul>
                                            <li>
                                                <a href="#general-info">General Info</a>
                                            </li>
                                            <li>
                                                <a href="#privacy-policy">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="#terms-of-service">Terms of Service</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-medium">Talk to Us</h3>
                                        <ul>
                                            <li>
                                                Email: <a href="mailto:support@tercom.com">support@tercom.com</a>
                                            </li>
                                            <li>Phone: +66 2339 1145</li>
                                            <li>
                                                <a href="https://www.facebook.com" target="_blank">
                                                    Facebook
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.linkedin.com" target="_blank">
                                                    LinkedIn
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.twitter.com" target="_blank">
                                                    Twitter
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default LayoutComponet;
