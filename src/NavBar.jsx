import React from "react";
import { NavLink } from "react-router-dom";

// Define menu items and routes
const habitPages = [
  { name: "Dashboard", path: "/" },
  { name: "Coding", path: "/coding" },
  { name: "Physical", path: "/physical" },
  { name: "Mental Health", path: "/mental" },
  // Add more habits as needed
];

const NavBar = () => {
  return (
    <nav className="flex gap-6 px-2 sm:px-4 justify-center bg-black border-b-2 border-yellow-400">
      {habitPages.map((page) => (
        <NavLink
          key={page.path}
          to={page.path}
          className={({ isActive }) =>
            [
              "px-4 py-2 rounded-lg font-semibold transition-colors duration-200",
              isActive
                ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40"
                : "text-yellow-400 hover:bg-yellow-900  hover:shadow-md hover:shadow-yellow-400/30",
            ].join(" ")
          }
          end={page.path === "/"}
        >
          {page.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
