"use client";

import './globals.css';
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function SignInPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <header className="mb-6">
          <h1 className="text-4xl font-bold">Firebase Auth</h1>
        </header>
        {user ? (
          <div>
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src={user.photoURL || "/default-avatar.png"}
              alt="User profile"
            />
            <p className="text-xl mb-2">Welcome, {user.displayName}</p>
            <p className="text-gray-400 mb-4">{user.email}</p>
            <p className="mb-4">
              <Link href="/protected" className="text-blue-500 hover:underline">
                Go to Protected Page
              </Link>
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleSignIn}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Sign In with GitHub
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
