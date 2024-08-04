"use client";

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faDumbbell, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const achievements = [
  { id: 1, text: "3 Hours Focus", icon: faStopwatch },
  { id: 2, text: "10 Hours Tuned", icon: faMedal },
  { id: 3, text: "Daily Workout", icon: faDumbbell },
  { id: 4, text: "Pomodoro Master", icon: faStopwatch },
];

export default function AchievementsPage() {
  const { user } = useUserAuth();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleShareClick = (achievement) => {
    setSelectedAchievement(achievement);
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
    setSelectedAchievement(null);
  };

  const handleShare = (platform) => {
    let url = "";
    const text = `I've just achieved: ${selectedAchievement.text}!`;

    switch (platform) {
      case "instagram":
        url = `https://www.instagram.com/`; // Instagram sharing is limited via web
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(text)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${window.location.href}`;
        break;
      default:
        break;
    }

    window.open(url, "_blank");
    handleCloseModal();
  };

  return (
    <main className="p-4 bg-gray-900 min-h-screen text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Achievements Page</h1>
      </header>
      {user ? (
        <div>
          <p className="mb-4">Achievements for {user.displayName}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={achievement.icon} className="text-yellow-500" size="2x" />
                  <span className="text-lg font-medium">{achievement.text}</span>
                </div>
                <button onClick={() => handleShareClick(achievement)} className="text-blue-500 hover:text-blue-400">
                  Share
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/protected" className="text-blue-500 hover:underline">Back to To-Do List</Link>
          </div>
        </div>
      ) : (
        <div>
          <p>You must be logged in to view this page.</p>
          <Link href="/" className="text-blue-500 hover:underline">Click here to return to the sign-in page.</Link>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Share your achievement</h2>
            <div className="flex space-x-4">
              <button onClick={() => handleShare("facebook")} className="text-blue-600 hover:text-blue-500">
                <FaFacebook size="2em" />
              </button>
              <button onClick={() => handleShare("twitter")} className="text-blue-400 hover:text-blue-300">
                <FaTwitter size="2em" />
              </button>
              <button onClick={() => handleShare("instagram")} className="text-pink-600 hover:text-pink-500">
                <FaInstagram size="2em" />
              </button>
            </div>
            <button onClick={handleCloseModal} className="mt-4 text-gray-400 hover:text-gray-300">
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
