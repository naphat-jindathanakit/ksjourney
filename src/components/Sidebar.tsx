"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  CakeIcon,
} from "@heroicons/react/24/solid"; // Import icons
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useTranslation } from "react-i18next"; // Import useTranslation

const Sidebar = ({ onToggle }: { onToggle: () => void }) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null); // Track selected menu
  const [isOpen, setIsOpen] = useState<boolean>(false); // Track sidebar open/close state
  const router = useRouter(); // Use the Next.js router from next/navigation
  const { t, i18n } = useTranslation(); // Access i18n and translation function

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

  const handleLanguageSwitch = () => {
    const newLang = i18n.language === "en" ? "th" : "en"; // Switch language between en and th
    i18n.changeLanguage(newLang); // Change the language
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex flex-col bg-sunsetPurple text-white p-4 ${
        isOpen ? "w-60" : "w-16"
      } h-full min-h-screen transition-all duration-300`}
    >
      {/* Sidebar content - Position menu at the top & center horizontally */}
      <div className="flex flex-col items-center space-y-4 w-full">
        {/* Home Button */}
        <button
          className={`flex items-center justify-center ${
            isOpen ? "p-3 w-full rounded-lg" : "w-12 h-12 rounded-full"
          } cursor-pointer transition-all ${
            selectedMenu === "Home"
              ? "bg-sunsetYellow text-black"
              : "hover:bg-sunsetYellow"
          }`}
          onClick={() => navigateTo("Home")}
        >
          <HomeIcon className="h-6 w-6 text-white" />
          {isOpen && <span className="ml-3 text-white">{t("home")}</span>}
        </button>

        {/* Wedding Button */}
        <button
          className={`flex items-center justify-center ${
            isOpen ? "p-3 w-full rounded-lg" : "w-12 h-12 rounded-full"
          } cursor-pointer transition-all ${
            selectedMenu === "Wedding"
              ? "bg-sunsetGreen text-black"
              : "hover:bg-sunsetGreen"
          }`}
          onClick={() => navigateTo("Wedding")}
        >
          <CakeIcon className="h-6 w-6 text-white" />
          {isOpen && <span className="ml-3 text-white">{t("wedding")}</span>}
        </button>
      </div>

      {/* Push other elements to the bottom */}
      <div className="flex flex-col justify-end flex-grow">
        {/* Language switch button */}
        <div className="mb-4 flex justify-center items-center">
          <button
            onClick={handleLanguageSwitch} // Switch the language when clicked
            className={`${
              isOpen ? "w-full py-2 rounded-lg" : "w-12 h-12"
            } bg-sunsetPeach rounded-full text-black hover:bg-sunsetYellow transition-colors flex items-center justify-center`}
          >
            {isOpen ? (
              <span className="text-white">
                {i18n.language === "en"
                  ? "🇹🇭 เปลี่ยนภาษา"
                  : "🇺🇸 Change Language"}
              </span>
            ) : (
              <span className="text-2xl">
                {i18n.language === "en" ? "🇹🇭" : "🇺🇸"}
              </span>
            )}
          </button>
        </div>

        {/* Expand/collapse button */}
        <div className="mb-4 flex justify-center items-center">
          <button
            onClick={handleToggleSidebar} // Toggle the sidebar open/close when clicked
            className={`w-12 h-12 rounded-full bg-sunsetPeach hover:bg-sunsetYellow transition-colors flex items-center justify-center`}
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            ) : (
              <ChevronRightIcon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
