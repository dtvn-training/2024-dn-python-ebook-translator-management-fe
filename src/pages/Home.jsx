import React, { useEffect, useState } from 'react';
import { get } from '~/db';
import { getTaskTable, getTaskDashboard } from '~/utils/urlApi';
import OverviewHeader from '~/components/OverviewHeader';
import BarChart from '~/components/BarChart';
import LineChart from '~/components/LineChart';
import TaskTable from '~/components/TaskTable';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Home = () => {
    const initDashboardData = {
        task_summary: { total_task: 0, completed_task: 0, uncompleted_task: 0 },
        count_task_per_day: {},
        tasks_per_day_current_month: {},
        tasks_per_day_last_month: {},
        count_task_of_month: { total_tasks: 0, total_completed: 0, total_uncompleted: 0 },
    };

    const [dashboardData, setDashboardData] = useState(initDashboardData);
    const [tasks, setTasks] = useState([]);

    const loadTableTasks = async () => {
        try {
            const res = await get(getTaskTable);
            if (res.status === 200) {
                setTasks(res.data || []);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const loadDashboard = async () => {
        try {
            const res = await get(getTaskDashboard);
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

    const getLabelfromDate = (dates) => dates.map((date) => new Date(date).getDate());
    const getBarDataset = (data, key, label, color) => ({
        label,
        data: data.map((dayData) => dayData[key] || 0),
        backgroundColor: color,
    });

    const barData = {
        labels: getLabelfromDate(Object.keys(dashboardData.count_task_per_day)),
        datasets: [
            getBarDataset(Object.values(dashboardData.count_task_per_day), 'completed', 'Completed Tasks', '#4bc0c0'),
            getBarDataset(
                Object.values(dashboardData.count_task_per_day),
                'uncompleted',
                'Uncompleted Tasks',
                '#ff6f61',
            ),
        ],
    };

    const getLineDataset = (label, data, borderColor, backgroundColor) => ({
        label,
        data,
        borderColor,
        backgroundColor,
        fill: true,
    });

    const lineData = {
        labels: getLabelfromDate(Object.keys(dashboardData.tasks_per_day_current_month)),
        datasets: [
            getLineDataset(
                'This Month Salary',
                Object.values(dashboardData.tasks_per_day_current_month),
                '#4bc0c0',
                'rgba(75, 192, 192, 0.2)',
            ),
            getLineDataset(
                'Last Month Salary',
                Object.values(dashboardData.tasks_per_day_last_month),
                '#ff6f61',
                'rgba(255, 111, 97, 0.2)',
            ),
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

    const barOptions = {
        scales: {
            x: {
                stacked: true,
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                stacked: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    const setColumns = (title, dataIndex, key, render) => ({
        title,
        dataIndex,
        key,
        render,
    });

    const columns = [
        setColumns('Ebook', 'ebook', 'ebook', (text) => <a href={`/desired-path/${text}`}>{text}</a>),
        setColumns('Chapter', 'chapter', 'chapter', (text) => <a href={`/desired-path/${text}`}>{text}</a>),
        setColumns('Task Owner', 'owner', 'owner', (text) => <a href={`/desired-path/${text}`}>{text}</a>),
        setColumns('Salary', 'salary', 'salary'),
        setColumns('Status', 'status', 'status', (isCompleted) =>
            isCompleted ? (
                <span style={{ color: '#4bc0c0', fontWeight: 'bold' }}>Completed</span>
            ) : (
                <span style={{ color: '#ff6f61', fontWeight: 'bold' }}>Uncompleted</span>
            ),
        ),
    ];

    return (
        <div className="font-sans p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
            <OverviewHeader taskSummary={dashboardData.task_summary} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <BarChart
                    barData={barData}
                    barOptions={barOptions}
                    countTaskOfMonth={dashboardData.count_task_of_month}
                />
                <LineChart lineData={lineData} lineOptions={options} />
            </div>
            <TaskTable columns={columns} tasks={tasks} />
        </div>
    );
};

export default Home;
