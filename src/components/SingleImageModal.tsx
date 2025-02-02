"use client";

import { FC } from "react";
import ArrowButton from "@/components/ArrowButton"; // Import ArrowButton
import { X } from "lucide-react";

interface SingleImageModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SingleImageModal: FC<SingleImageModalProps> = ({
  isOpen,
  image,
  onClose,
  onNext,
  onPrevious,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#A7C7E7] bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative w-full max-w-4xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#FFB3BA] rounded-full p-2 hover:bg-[#D1C4E9] transition-all duration-300 z-10"
        >
          <X />
        </button>

        {/* Image Display */}
        <div className="relative flex justify-center items-center">
          <img
            src={image}
            alt="Wedding Image"
            className="object-contain max-w-full max-h-[80vh] rounded-lg shadow-2xl border-2 border-[#D1C4E9]"
          />
        </div>

        {/* Navigation Arrows */}
        <ArrowButton direction="left" onClick={onPrevious} />
        <ArrowButton direction="right" onClick={onNext} />
      </div>
    </div>
  );
};

export default SingleImageModal;
