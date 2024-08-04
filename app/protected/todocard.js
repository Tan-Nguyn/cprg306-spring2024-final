'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function TodoCard({ todoObj, onSelect, onToggleComplete }) {
    const { id, title, description, priority, completed } = todoObj;

    const priorityColors = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500',
    };

    return (
        <div className={`border border-gray-700 m-2 p-4 rounded-md flex items-center bg-gray-800 shadow-lg`}>
            <input 
                type="checkbox" 
                checked={completed} 
                onChange={() => onToggleComplete(id)} 
                className="mr-4"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm">{description}</p>
                <p className={`text-sm ${priorityColors[priority]}`}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </p>
            </div>
            <FontAwesomeIcon 
                icon={faTrashAlt} 
                onClick={() => onSelect(todoObj)} 
                className="text-red-600 hover:text-red-800 ml-4 cursor-pointer"
            />
        </div>
    );
}
