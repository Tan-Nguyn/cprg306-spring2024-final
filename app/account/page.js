"use client";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function AccountPage() {
  const { user } = useUserAuth();

  return (
    <main>
      <header>
        <h1 className="text-3xl">Account Page</h1>
      </header>
      {user ? (
        <div>
          <p>Welcome {user.displayName}</p>
          <p>Email: {user.email}</p>
          <img className="w-8 h-8" src={user.photoURL} alt="User profile" />
          <div>
            <Link href="/protected">Back to To-Do List</Link>
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
