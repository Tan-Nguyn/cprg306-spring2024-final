'use client';

import { useState } from 'react';

export default function NewTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = { id: Date.now().toString(), title, description, priority };
    onAddTodo(todo);
    setTitle('');
    setDescription('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-md shadow-md w-full">
      <div className="w-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Add Todo
      </button>
    </form>
  );
}
