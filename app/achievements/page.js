"use client";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function AchievementsPage() {
  const { user } = useUserAuth();

  return (
    <main>
      <header>
        <h1 className="text-3xl">Achievements Page</h1>
      </header>
      {user ? (
        <div>
          <p>Achievements for {user.displayName}</p>
          {/* List achievements here */}
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
