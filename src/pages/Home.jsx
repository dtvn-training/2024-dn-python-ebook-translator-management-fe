import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Table } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    SolutionOutlined,
    RocketOutlined,
    FolderViewOutlined,
} from '@ant-design/icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const data = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];

const dataThisMonth = [
    100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150,
    1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600,
];

const dataLastMonth = [
    90, 140, 180, 220, 260, 310, 360, 420, 470, 510, 560, 600, 640, 680, 720, 760, 800, 850, 900, 950, 1000, 1050, 1100,
    1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500,
];

const Home = () => {
    const barData = {
        labels: labels,
        datasets: [
            {
                label: 'Total tasks',
                data: data,
                backgroundColor: '#ff6f61',
            },
        ],
    };

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: 'This Month',
                data: dataThisMonth,
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Last Month',
                data: dataLastMonth,
                borderColor: '#ff6f61',
                backgroundColor: 'rgba(255, 111, 97, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `$${context.raw}`;
                    },
                },
            },
        },
    };

    const columns = [
        {
            title: 'Ebook',
            dataIndex: 'ebook',
            key: 'ebook',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Chapter',
            dataIndex: 'chapter',
            key: 'chapter',
        },
        {
            title: 'TaskOwner',
            dataIndex: 'taskOwner',
            key: 'taskOwner',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
        },
    ];

    const tasks = [
        { ebook: 'ebook 1', chapter: 'Chapter 1', taskOwner: 'Nguyen Thanh An', status: 'Final' },
        { ebook: 'ebook 2', chapter: 'Chapter 2', taskOwner: 'Nguyen Thanh An', status: 'Final' },
        { ebook: 'ebook 3', chapter: 'Chapter 3', taskOwner: 'Nguyen Thanh An', status: 'Final' },
    ];

    return (
        <div className="font-sans p-8 bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold text-gray-800">Dashboard</h1>

            <div className="flex justify-around mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Total tasks</h2>
                        <p className="text-1xl">700</p>
                    </div>
                    <SolutionOutlined className="text-4xl text-blue-500 ml-4" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Completed tasks</h2>
                        <p className="text-1xl">300</p>
                    </div>
                    <CheckCircleOutlined className="text-4xl text-green-500 mt-2" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Uncompleted Tasks</h2>
                        <p className="text-1xl">120</p>
                    </div>
                    <ClockCircleOutlined className="text-4xl text-yellow-500 mt-2" />
                </div>
            </div>

            <div className="flex justify-between mt-12">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mr-8">
                    <Bar data={barData} options={options} />
                    <h1 className="text-xl font-semibold mb-4 mt-8">Task number of month</h1>
                    <div className="flex items-center justify-between">
                        <span className="flex items-center p-4 border-2 border-teal-400 rounded-lg w-full mr-8">
                            <FolderViewOutlined className="text-white bg-teal-400 p-3 rounded-md text-4xl" />
                            <div className="ml-4">
                                <p className="text-lg font-semibold">Quantity</p>
                                <p className="text-sm text-gray-500">500</p>
                            </div>
                        </span>
                        <span className="flex items-center p-4 border-2 border-teal-400 rounded-lg w-full">
                            <RocketOutlined className="text-white bg-teal-400 p-3 rounded-md text-4xl" />
                            <div className="ml-4">
                                <p className="text-lg font-semibold">Last week</p>
                                <p className="text-sm text-gray-500">120</p>
                            </div>
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h1 className="text-xl font-semibold mb-12">Task Overview</h1>
                    <Line data={lineData} options={options} />
                    <div className="mt-6 text-center">
                        <p className="font-medium text-lg">Comparison of Sales for this month and last month</p>
                        <p className="text-sm text-gray-500">
                            The graph compares the total sales over this month vs last month
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
                <h1 className="text-2xl font-semibold mb-4">Task Management</h1>
                <Table columns={columns} dataSource={tasks} />
            </div>
        </div>
    );
};

export default Home;
