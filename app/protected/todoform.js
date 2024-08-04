'use client';

import { useState } from 'react';

export default function TodoForm({ closeFormFunc, onCreateTodo }) {
    const controlStyles = "block mb-4";
    const inputStyles = "block mt-1 p-1 w-full rounded-sm text-black bg-gray-700 focus:bg-gray-600";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");

    const handleSubmit = (event) => {
        event.preventDefault();
        const todo = { id: Date.now().toString(), title, description, priority, completed: false };
        onCreateTodo(todo);
        setTitle("");
        setDescription("");
        setPriority("low");
        closeFormFunc();
    };

    return (
        <div onClick={closeFormFunc} className="absolute w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
            <section onClick={(event) => event.stopPropagation()} className="max-w-md p-8 rounded-lg shadow-md bg-gray-900 text-white">
                <h2 className="text-xl mb-4">Add New To-Do</h2>
                <form onSubmit={handleSubmit}>
                    <div className={controlStyles}>
                        <label className="block">Title: </label>
                        <input onChange={(event) => setTitle(event.target.value)} value={title} type="text" className={inputStyles} required />
                    </div>
                    <div className={controlStyles}>
                        <label className="block">Description: </label>
                        <textarea onChange={(event) => setDescription(event.target.value)} value={description} className={inputStyles}></textarea>
                    </div>
                    <div className={controlStyles}>
                        <label className="block">Priority: </label>
                        <select onChange={(event) => setPriority(event.target.value)} value={priority} className={inputStyles}>
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>
                    <div className={controlStyles}>
                        <button className="w-full py-2 px-4 rounded-sm bg-blue-600 hover:bg-blue-500">Add To-Do</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
