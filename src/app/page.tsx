"use client"; // Make sure this is a client component

import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import { useTranslation } from "react-i18next";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage the state of the sidebar
  const { t } = useTranslation();
  // Function to toggle the sidebar open/close
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-sunsetOrange">
      {/* Sidebar */}
      <Sidebar onToggle={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 p-6 flex flex-col items-center justify-start transition-all duration-300 ${
          !isOpen ? "ml-16" : "ml-60"
        } bg-colorfulPastel`} // Adjust for mobile and larger screens
      >
        {/* Header Section */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-sunsetYellow mb-6 mt-8">
          {t("home_header")}
        </h1>

        {/* Center Image */}
        <div className="mb-6 max-w-full w-[90%] md:w-auto">
          <img
            src="/images/Wedding-1.jpg" // Replace with your actual image path
            alt="Kwang & Suea"
            className="w-full md:max-w-lg rounded-lg shadow-lg"
          />
        </div>

        {/* Description Block */}
        <div className="bg-sunsetPink p-6 rounded-lg shadow-lg text-center max-w-3xl w-full">
          <p className="text-lg text-[#4E3B31]">{t("home_message")}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
