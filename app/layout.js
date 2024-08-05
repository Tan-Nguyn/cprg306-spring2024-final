import { AuthContextProvider } from "./_utils/auth-context";
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      <body className="flex min-h-screen bg-gray-900 text-white">
        <AuthContextProvider>
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
          <div className="flex-1 p-4 ml-64">
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default Layout;
