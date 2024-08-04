'use client';

import { useState } from 'react';
import Todo from './todo';

export default function TodoList({ todos, onTodoSelect }) {
  const [sortBy, setSortBy] = useState('title');

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'priority') {
      const priorities = { 'low': 1, 'medium': 2, 'high': 3 };
      return priorities[a.priority] - priorities[b.priority];
    }
    return 0;
  });

  return (
    <div className="w-full mt-4">
      <div className="mb-4 flex">
        <button
          onClick={() => setSortBy('title')}
          className={`p-2 mr-2 ${sortBy === 'title' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded`}
        >
          Sort by Title
        </button>
        <button
          onClick={() => setSortBy('priority')}
          className={`p-2 ${sortBy === 'priority' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded`}
        >
          Sort by Priority
        </button>
      </div>
      <ul>
        {sortedTodos.map(todo => (
          <Todo key={todo.id} todo={todo} onSelect={onTodoSelect} />
        ))}
      </ul>
    </div>
  );
}
