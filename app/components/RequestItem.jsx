// app/components/RequestItem.jsx
import React from 'react';

const RequestItem = ({ request }) => {
    const statusColor = request.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{request.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Oleh: {request.author} 
                </p>
                {/* Asumsi: request.user adalah objek user yang difetch dari Supabase */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Requested by User ID: {request.user_id.substring(0, 8)}... (at: {new Date(request.created_at).toLocaleDateString()})
                </p>
            </div>
            <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${statusColor}`}>
                    {request.status}
                </span>
                <button 
                    disabled={request.status !== 'pending'}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition"
                >
                    Mark Complete
                </button>
            </div>
        </div>
    );
};

export default RequestItem;