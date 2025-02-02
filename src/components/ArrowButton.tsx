// components/ArrowButton.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 bg-[#C8E6C9] text-white p-3 rounded-full hover:bg-[#A7C7E7] transition-all duration-300 z-10"
      style={{ [direction]: "4px" }} // Dynamic placement for left or right arrow
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};

export default ArrowButton;
