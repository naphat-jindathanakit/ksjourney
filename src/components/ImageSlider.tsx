"use client";

import { useState, useEffect } from "react";

interface ImageSliderProps {
  images: string[];
  onImageClick: (image: string, index: number) => void; // Add onImageClick prop
}

const ImageSlider = ({ images, onImageClick }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 1500); // Auto-slide every 3 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {/* Image Slider */}
      <div className="flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt={`Wedding Image ${currentIndex + 1}`}
          className="w-full h-auto rounded-lg shadow-lg object-contain cursor-pointer" // Updated to object-contain to fit the full image
          style={{ maxHeight: "500px" }} // Ensure image height doesn't exceed 500px
          onClick={() => onImageClick(images[currentIndex], currentIndex)} // Trigger onImageClick when an image is clicked
        />
      </div>
    </div>
  );
};

export default ImageSlider;
