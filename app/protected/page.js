'use client';

import { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';
import { db } from '../_utils/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp, orderBy } from 'firebase/firestore';
import NewTodo from './newtodo';
import TodoList from './todolist';

export default function ProtectedPage() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);

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
    await addDoc(collection(db, 'todos'), {
      ...todo,
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    fetchTodos();
  };

  const handleTodoSelect = (todo) => {
    deleteTodo(todo.id);
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">To-Do List</h1>
      </header>
      {user ? (
        <div>
          <NewTodo onAddTodo={addTodo} />
          <TodoList todos={todos} onTodoSelect={handleTodoSelect} />
          <div className="mt-8">
            <Link href="/account" className="text-blue-500 hover:underline">Account Page</Link>
            <br />
            <Link href="/achievements" className="text-blue-500 hover:underline">Achievements Page</Link>
          </div>
        </div>
      ) : (
        <div>
          <p>You must be logged in to view this page.</p>
          <Link href="/" className="text-blue-500 hover:underline">Click here to return to the sign-in page.</Link>
        </div>
      )}
    </main>
  );
}
