import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { name: "To-Do List", href: "/protected" },
  { name: "Achievements", href: "/achievements" },
  { name: "Account", href: "/account" },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <a
                className={`py-2 px-4 rounded-sm text-white hover:bg-gray-700 ${
                  router.pathname === item.href ? "bg-gray-700" : "bg-gray-800"
                }`}
              >
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
