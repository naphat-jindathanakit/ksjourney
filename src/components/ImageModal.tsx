"use client";

import { FC } from "react";

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, images, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-sunsetPurple bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-colorfulPastel p-6 rounded-lg max-w-4xl w-full overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-sunsetOrange rounded-full p-2 hover:bg-sunsetYellow transition-all duration-300"
        >
          X
        </button>

        {/* Scrollable Image Grid */}
        <div className="overflow-y-auto max-h-[70vh] mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Wedding Image ${index + 1}`}
                  className="w-full max-w-[200px] h-auto rounded-lg shadow-lg border-2 border-sunsetPink"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
