'use client';

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation'; // Use next/navigation for routing
import Link from "next/link";

export default function AccountPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter(); // Initialize the router
  const [isEditing, setIsEditing] = useState(false);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/'); // Redirect to home page after signing out
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleEditProfile = () => {
    // Add logic for editing profile here
    setIsEditing(true); // Example logic
  };

  return (
    <main className="p-4 bg-gray-900 min-h-screen text-white flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Account Page</h1>
      </header>
      {user ? (
        <div className="flex-grow flex flex-col items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <img src={user.photoURL || "/default-avatar.png"} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <p className="mb-2"><strong>Name:</strong> {user.displayName || "N/A"}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            {/* Add more user information here as needed */}
          </div>
          <div className="mt-8 flex flex-col gap-4 items-center">
            <button
              onClick={handleEditProfile}
              className="py-1 px-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm"
            >
              Change Profile
            </button>
            <div className="mt-auto">
              <button
                onClick={handleSignOut}
                className="py-1 px-3 bg-red-600 hover:bg-red-500 rounded-lg text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-white">You must be logged in to view this page.</p>
          <Link href="/" className="text-blue-500 hover:underline">Click here to return to the sign-in page.</Link>
        </div>
      )}
    </main>
  );
}
