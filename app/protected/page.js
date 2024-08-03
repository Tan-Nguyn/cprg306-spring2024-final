"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { db } from "../_utils/firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

export default function ProtectedPage() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const todosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todosData);
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    await addDoc(collection(db, "todos"), {
      text: newTodo,
      userId: user.uid,
      createdAt: new Date(),
    });
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  return (
    <main>
      <header>
        <h1 className="text-3xl">To-Do List</h1>
      </header>
      {user ? (
        <div>
          <div>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New To-Do"
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div>
            <Link href="/account">Account Page</Link>
            <br />
            <Link href="/achievements">Achievements Page</Link>
          </div>
        </div>
      ) : (
        <div>
          <p>You must be logged in to view this page.</p>
          <Link href="/">Click here to return to the sign-in page.</Link>
        </div>
      )}
    </main>
  );
}
