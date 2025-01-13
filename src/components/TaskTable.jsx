import React from 'react';
import { Table } from 'antd';

const TaskTable = ({ columns, tasks }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Task Management</h1>
        <Table columns={columns} dataSource={tasks} rowKey="id" scroll={{ x: 800 }} />
    </div>
);

export default TaskTable;
