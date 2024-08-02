"use client";

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
    <main>
      <header>
        <h1 className="text-3xl">Firebase Auth</h1>
      </header>
      {user ? (
        <div>
          <p>Welcome {user.displayName}</p>
          <p>{user.email}</p>
          <img className="w-8 h-8" src={user.photoURL} alt="User profile" />
          <p>
            <Link href="/week-8/protected/">Protected Page</Link>
          </p>
          <button onClick={handleSignOut} className="text-lg m-2 hover:underline">
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn} className="text-lg m-2 hover:underline">
            Sign In with GitHub
          </button>
        </div>
      )}
    </main>
  );
}
