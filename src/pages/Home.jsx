import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Table } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    SolutionOutlined,
    RocketOutlined,
    FolderViewOutlined,
} from '@ant-design/icons';
import axios from 'axios';
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

const Home = () => {
    const [taskSummary, setTaskSummary] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/task/dashboard');
                const { task_summary, tasks } = response.data;
                setTaskSummary(task_summary);
                setTasks(tasks);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const barData = {
        labels: labels,
        datasets: [
            {
                label: 'Total tasks',
                data: taskSummary?.total_task ? [taskSummary.total_task] : [0], // Update with actual data if available
                backgroundColor: '#ff6f61',
            },
        ],
    };

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: 'This Month',
                data: taskSummary?.tasks_by_day ? taskSummary.tasks_by_day.map((item) => item.task_count) : [],
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Last Month',
                data: [],
                borderColor: '#ff6f61',
                backgroundColor: 'rgba(255, 111, 97, 0.2)',
                fill: true,
            },
        ],
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

    return (
        <div className="font-sans p-8 bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold text-gray-800">Dashboard</h1>

            <div className="flex justify-around mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Total tasks</h2>
                        <p className="text-1xl">{taskSummary?.total_task || 0}</p>
                    </div>
                    <SolutionOutlined className="text-4xl text-blue-500 ml-4" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Completed tasks</h2>
                        <p className="text-1xl">{taskSummary?.completed_task || 0}</p>
                    </div>
                    <CheckCircleOutlined className="text-4xl text-green-500 mt-2" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Uncompleted Tasks</h2>
                        <p className="text-1xl">{taskSummary?.uncompleted_task || 0}</p>
                    </div>
                    <ClockCircleOutlined className="text-4xl text-yellow-500 mt-2" />
                </div>
            </div>

            <div className="flex justify-between mt-12">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mr-8">
                    <Bar data={barData} options={{ responsive: true }} />
                    <h1 className="text-xl font-semibold mb-4 mt-8">Task number of month</h1>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h1 className="text-xl font-semibold mb-12">Task Overview</h1>
                    <Line data={lineData} options={{ responsive: true }} />
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
