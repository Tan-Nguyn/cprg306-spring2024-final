'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-4 h-full fixed left-0 top-0">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/protected" className="block py-2 px-4 rounded-lg hover:bg-gray-700">To-Do List</Link>
          </li>
          <li>
            <Link href="/account" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Account Page</Link>
          </li>
          <li>
            <Link href="/achievements" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Achievements Page</Link>
          </li>
          <li>
            <Link href="/pomodoro" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Pomodoro Timer</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
