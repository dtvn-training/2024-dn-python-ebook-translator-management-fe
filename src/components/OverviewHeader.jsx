import React from 'react';
import { SolutionOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const SummaryCards = ({ taskSummary }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[
            {
                title: 'Total tasks',
                value: taskSummary.total_task,
                icon: <SolutionOutlined className="text-3xl sm:text-4xl text-blue-500 ml-4" />,
            },
            {
                title: 'Completed tasks',
                value: taskSummary.completed_task,
                icon: <CheckCircleOutlined className="text-3xl sm:text-4xl text-green-500 mt-2" />,
            },
            {
                title: 'Uncompleted tasks',
                value: taskSummary.uncompleted_task,
                icon: <ClockCircleOutlined className="text-3xl sm:text-4xl text-yellow-500 mt-2" />,
            },
        ].map(({ title, value, icon }, index) => (
            <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center flex justify-between items-center"
            >
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
                    <p className="text-lg">{value}</p>
                </div>
                {icon}
            </div>
        ))}
    </div>
);

export default SummaryCards;
