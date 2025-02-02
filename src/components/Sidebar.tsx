"use client"; // Make sure this is a client component

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Import icons
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const Sidebar = ({ onToggle }: { onToggle: () => void }) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null); // Track selected menu
  const [isOpen, setIsOpen] = useState<boolean>(false); // Track sidebar open/close state
  const router = useRouter(); // Use the Next.js router from next/navigation

  useEffect(() => {
    const storedMenu = localStorage.getItem("selectedMenu"); // Get saved menu from localStorage
    if (storedMenu) {
      setSelectedMenu(storedMenu); // Set the saved menu as the selected menu
    }
  }, []);

  const handleToggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen); // Toggle sidebar state
    onToggle(); // Execute passed toggle function
  };

  const navigateTo = (menu: string) => {
    localStorage.setItem("selectedMenu", menu); // Save selected menu to localStorage
    setSelectedMenu(menu); // Update the selected menu state
    if (menu === "Wedding") {
      router.push("/wedding"); // Navigate to the wedding page
    } else if (menu === "Home") {
      router.push("/"); // Navigate to the home page
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex flex-col bg-[#A7C7E7] text-white p-4 ${
        isOpen ? "w-60" : "w-16"
      } h-full min-h-screen transition-all duration-300`} // Fixed positioning for the sidebar
    >
      {/* Sidebar content */}
      {isOpen && (
        <div className="flex flex-col items-center mb-6 w-full">
          <h2 className="text-lg font-bold mb-4 text-[#D1C4E9]">Menu</h2>{" "}
          {/* Bold "Menu" text with a contrasting color */}
          <ul className="space-y-4 w-full">
            <li
              className={`flex items-center justify-center p-4 w-full cursor-pointer transition-colors duration-200 rounded-lg ${
                selectedMenu === "Home" ? "bg-[#FFB3BA]" : "hover:bg-[#FFB3BA]"
              }`}
              onClick={() => navigateTo("Home")}
            >
              Home
            </li>
            <li
              className={`flex items-center justify-center p-4 w-full cursor-pointer transition-colors duration-200 rounded-lg ${
                selectedMenu === "Wedding"
                  ? "bg-[#FFB3BA]"
                  : "hover:bg-[#FFB3BA]"
              }`}
              onClick={() => navigateTo("Wedding")}
            >
              Wedding
            </li>
            {/* Add other menu items here */}
          </ul>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={handleToggleSidebar} // Toggle the sidebar open/close when clicked
        className="absolute bottom-8 left-4 p-2 bg-[#C8E6C9] rounded-full hover:bg-[#A7C7E7] transition-colors"
      >
        {/* Show the appropriate arrow icon */}
        {isOpen ? (
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        ) : (
          <ChevronRightIcon className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
