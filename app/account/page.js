'use client';

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation';
import Layout from '../layout';
import { updateProfile } from "firebase/auth";
import { db } from '../_utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../globals.css';

export default function AccountPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      const fetchDescription = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDescription(userDoc.data().description || "");
        }
      };
      fetchDescription();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/');
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    try {
      if (user) {
        await updateProfile(user, {
          displayName,
          photoURL
        });
        
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          description,
        });

        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Account Page</h1>
      </header>
      {user ? (
        <div className="flex-grow flex flex-col items-center">
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="mb-4">
                <label className="block text-white">Name:</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-2 text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Photo URL:</label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full p-2 text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 text-black"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-sm text-white ml-2"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <img src={user.photoURL || "/default-avatar.png"} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-4">User Information</h2>
              <p className="mb-2"><strong>Name:</strong> {user.displayName || "N/A"}</p>
              <p className="mb-2"><strong>Email:</strong> {user.email}</p>
              <p className="mb-2"><strong>Description:</strong> {description || "No description provided"}</p>
              <button
                onClick={handleEditProfile}
                className="py-1 px-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm"
              >
                Change Profile
              </button>
              <div className="mt-4">
                <button
                  onClick={handleSignOut}
                  className="py-1 px-3 bg-red-600 hover:bg-red-500 rounded-lg text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-white">You must be logged in to view this page.</p>
        </div>
      )}
    </Layout>
  );
}
