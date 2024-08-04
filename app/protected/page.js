'use client';

import '../globals.css';
import { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';
import { db } from '../_utils/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp, orderBy, updateDoc } from 'firebase/firestore';
import TodoForm from './todoform';
import TodoList from './todolist';

export default function ProtectedPage() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTodos();
      // Seed sample data once if the collection is empty
      seedSampleTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const todosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTodos(todosData);
  };

  const addTodo = async (todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
    await addDoc(collection(db, 'todos'), {
      ...todo,
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
    fetchTodos(); 
  };

  const deleteTodo = async (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    await deleteDoc(doc(db, 'todos', id));
    fetchTodos(); // Fetch the latest todos from the server
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))); 
    await updateDoc(doc(db, 'todos', id), { completed: updatedTodo.completed });
    fetchTodos();
  };

  const handleTodoSelect = (todo) => {
    deleteTodo(todo.id);
  };

  const seedSampleTodos = async () => {
    const sampleTodos = [
      { text: "Buy groceries", completed: false },
      { text: "Read a book", completed: true },
      { text: "Exercise for 30 minutes", completed: false },
      { text: "Finish project report", completed: false },
      { text: "Call the plumber", completed: true }
    ];

    // Check if there are no todos already
    const querySnapshot = await getDocs(query(collection(db, 'todos'), where('userId', '==', user.uid)));
    if (querySnapshot.empty) {
      for (const todo of sampleTodos) {
        await addDoc(collection(db, 'todos'), {
          ...todo,
          userId: user.uid,
          createdAt: Timestamp.now(),
        });
      }
      fetchTodos(); // Refresh the list after seeding
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 h-full fixed left-0 top-0">
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/protected" className="block py-2 px-4 rounded-lg hover:bg-gray-700">To-Do List</Link>
            </li>
            <li>
              <Link href="/account" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Account Page</Link>
            </li>
            <li>
              <Link href="/achievements" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Achievements Page</Link>
            </li>
            <li>
              <Link href="/pomodoro" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Pomodoro Timer</Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-4 ml-64"> {/* Add ml-64 to offset content by sidebar width */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-6">To-Do List</h1>
        </header>
        {user ? (
          <div>
            <button onClick={() => setShowForm(true)} className="mb-4 py-2 px-4 rounded-sm bg-blue-600 hover:bg-blue-500 text-white">Add New To-Do</button>
            {showForm && <TodoForm closeFormFunc={() => setShowForm(false)} onCreateTodo={addTodo} />}
            <TodoList listOfTodos={todos} onTodoSelect={handleTodoSelect} onToggleComplete={toggleComplete} />
          </div>
        ) : (
          <div>
            <p className="text-white">You must be logged in to view this page.</p>
            <Link href="/" className="text-blue-500 hover:underline">Click here to return to the sign-in page.</Link>
          </div>
        )}
      </div>
    </main>
  );
}
