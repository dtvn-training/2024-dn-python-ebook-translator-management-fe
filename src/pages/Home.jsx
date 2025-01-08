import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { get } from '~/db';
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

const Home = () => {
    const [dashboardData, setDashboardData] = useState({
        task_summary: { total_task: 0, completed_task: 0, uncompleted_task: 0 },
        count_task_per_day: {},
        tasks_per_day_current_month: {},
        tasks_per_day_last_month: {},
        count_task_of_month: { total_tasks: 0, total_completed: 0, total_uncompleted: 0 },
    });
    const [tasks, setTasks] = useState([]);

    const loadTableTasks = async () => {
        try {
            const res = await get('/task/table_tasks');
            if (res.status === 200) {
                setTasks(res.data || []);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const loadDashboard = async () => {
        try {
            const res = await get('/task/dashboard');
            if (res.status === 200) {
                setDashboardData({
                    task_summary: {
                        total_task: res.data.total_task || 0,
                        completed_task: res.data.completed_task || 0,
                        uncompleted_task: res.data.uncompleted_task || 0,
                    },
                    count_task_per_day: res.data.count_task_per_day || {},
                    tasks_per_day_current_month: res.data.tasks_per_day_current_month || {},
                    tasks_per_day_last_month: res.data.tasks_per_day_last_month || {},

                    count_task_of_month: {
                        total_tasks: res.data.count_task_of_month.total_tasks || 0,
                        total_completed: res.data.count_task_of_month.total_completed || 0,
                        total_uncompleted: res.data.count_task_of_month.total_uncompleted || 0,
                    },
                });
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    useEffect(() => {
        loadTableTasks();
        loadDashboard();
    }, []);

    const barData = {
        labels: Object.keys(dashboardData.count_task_per_day).map((date) => {
            const day = new Date(date).getDate();
            return day.toString();
        }),
        datasets: [
            {
                label: 'Completed Tasks',
                data: Object.values(dashboardData.count_task_per_day).map((dayData) => dayData.completed || 0),
                backgroundColor: '#33CC66',
            },
            {
                label: 'Uncompleted Tasks',
                data: Object.values(dashboardData.count_task_per_day).map((dayData) => dayData.uncompleted || 0),
                backgroundColor: '#FF0066',
            },
        ],
    };

    const lineData = {
        labels: Object.keys(dashboardData.tasks_per_day_current_month).map((date) => {
            const day = new Date(date).getDate();
            return day.toString();
        }),
        datasets: [
            {
                label: 'This Month Salary',
                data: Object.values(dashboardData.tasks_per_day_current_month || {}),
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Last Month Salary',
                data: Object.values(dashboardData.tasks_per_day_last_month || {}),
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
        },
    };
    const bar_options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const columns = [
        {
            title: 'Ebook',
            dataIndex: 'ebook',
            key: 'ebook',
            render: (text) => <Link to={`/desired-path/${text}`}>{text}</Link>,
        },
        {
            title: 'Chapter',
            dataIndex: 'chapter',
            key: 'chapter',
        },
        {
            title: 'Task Owner',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (isCompleted) =>
                isCompleted ? (
                    <span style={{ color: '#4bc0c0', fontWeight: 'bold' }}>Completed</span>
                ) : (
                    <span style={{ color: '#ff6f61', fontWeight: 'bold' }}>Uncompleted</span>
                ),
        },
    ];

    return (
        <div className="font-sans p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">Total tasks</h2>
                        <p className="text-lg">{dashboardData.task_summary.total_task}</p>
                    </div>
                    <SolutionOutlined className="text-3xl sm:text-4xl text-blue-500 ml-4" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">Completed tasks</h2>
                        <p className="text-lg">{dashboardData.task_summary.completed_task}</p>
                    </div>
                    <CheckCircleOutlined className="text-3xl sm:text-4xl text-green-500 mt-2" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center flex justify-between items-center">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">Uncompleted Tasks</h2>
                        <p className="text-lg">{dashboardData.task_summary.uncompleted_task}</p>
                    </div>
                    <ClockCircleOutlined className="text-3xl sm:text-4xl text-yellow-500 mt-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-lg sm:text-xl font-semibold mb-6">The number Tasks of month</h1>
                    <Bar data={barData} options={(options, bar_options)} />
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                        <span className="flex items-center p-4 border-2 border-teal-400 rounded-lg w-full sm:w-1/2">
                            <FolderViewOutlined className="text-white bg-teal-400 p-3 rounded-md text-3xl sm:text-4xl" />
                            <div className="ml-4">
                                <p className="text-sm sm:text-lg font-semibold">Quantity</p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {dashboardData.count_task_of_month.total_tasks}
                                </p>
                            </div>
                        </span>
                        <span className="flex items-center p-4 border-2 border-teal-400 rounded-lg w-full sm:w-1/2">
                            <RocketOutlined className="text-white bg-teal-400 p-3 rounded-md text-3xl sm:text-4xl" />
                            <div className="ml-4">
                                <p className="text-sm sm:text-lg font-semibold">Tasks in progress</p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {dashboardData.count_task_of_month.total_uncompleted}
                                </p>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-lg sm:text-xl font-semibold mb-6">Revenue Overview</h1>
                    <Line data={lineData} options={options} />
                    <div className="mt-6 text-center">
                        <p className="font-medium text-sm sm:text-lg">
                            Comparison of Sales for this month and last month
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            The graph compares the total sales over this month vs last month
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4">Task Management</h1>
                <Table columns={columns} dataSource={tasks} rowKey="id" scroll={{ x: 800 }} />
            </div>
        </div>
    );
};

export default Home;
