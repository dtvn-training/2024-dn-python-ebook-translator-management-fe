import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FolderViewOutlined, RocketOutlined } from '@ant-design/icons';

const TaskBarChart = ({ barData, barOptions, countTaskOfMonth }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-lg sm:text-xl font-semibold mb-6">The number Tasks of month</h1>
        <Bar data={barData} options={barOptions} />
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            {[
                {
                    label: 'Quantity',
                    value: countTaskOfMonth.total_tasks,
                    icon: <FolderViewOutlined className="text-white bg-teal-400 p-3 rounded-md text-3xl sm:text-4xl" />,
                },
                {
                    label: 'Tasks in progress',
                    value: countTaskOfMonth.total_uncompleted,
                    icon: <RocketOutlined className="text-white bg-teal-400 p-3 rounded-md text-3xl sm:text-4xl" />,
                },
            ].map(({ label, value, icon }, index) => (
                <span key={index} className="flex items-center p-4 border-2 border-teal-400 rounded-lg w-full sm:w-1/2">
                    {icon}
                    <div className="ml-4">
                        <p className="text-sm sm:text-lg font-semibold">{label}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{value}</p>
                    </div>
                </span>
            ))}
        </div>
    </div>
);

export default TaskBarChart;
