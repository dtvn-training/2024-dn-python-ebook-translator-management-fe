import React from 'react';
import { Line } from 'react-chartjs-2';

const TaskLineChart = ({ lineData, lineOptions }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-lg sm:text-xl font-semibold mb-6">Revenue Overview</h1>
        <Line data={lineData} options={lineOptions} />
        <div className="mt-6 text-center">
            <p className="font-medium text-sm sm:text-lg">Comparison of Sales for this month and last month</p>
            <p className="text-xs sm:text-sm text-gray-500">
                The graph compares the total sales over this month vs last month
            </p>
        </div>
    </div>
);

export default TaskLineChart;
