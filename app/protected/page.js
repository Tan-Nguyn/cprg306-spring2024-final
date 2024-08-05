'use client';

import { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { db } from '../_utils/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp, orderBy, updateDoc } from 'firebase/firestore';
import TodoForm from './todoform';
import TodoList from './todolist';
import Layout from '../layout';
import '../globals.css'

export default function ProtectedPage() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTodos();
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
    fetchTodos(); 
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

  return (
    <Layout>
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
        </div>
      )}
    </Layout>
  );
}
