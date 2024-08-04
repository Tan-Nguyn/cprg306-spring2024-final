'use client';

export default function Todo({ todo, onSelect }) {
  return (
    <li
      className="p-4 mb-2 bg-gray-800 text-white rounded shadow cursor-pointer"
      onClick={() => onSelect(todo)}
    >
      <div className="text-lg font-semibold">{todo.title}</div>
      <div className="text-sm">{todo.description}</div>
      <div className={`text-sm ${todo.priority === 'high' ? 'text-red-500' : todo.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
      </div>
    </li>
  );
}
