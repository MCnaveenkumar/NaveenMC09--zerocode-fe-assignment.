import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const AnalyticsDashboard: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const totalMessages = messages.length;
  const userMessages = messages.filter(msg => msg.sender === 'user').length;
  const botMessages = messages.filter(msg => msg.sender === 'bot').length;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Analytics Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total Messages</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{totalMessages}</p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">User Messages</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">{userMessages}</p>
        </div>
        <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Bot Messages</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">{botMessages}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 