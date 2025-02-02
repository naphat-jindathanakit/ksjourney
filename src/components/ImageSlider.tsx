"use client";

import { useState, useEffect } from "react";
import ArrowButton from "./ArrowButton";

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to the previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {/* Image Slider */}
      <div className="flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt={`Wedding Image ${currentIndex + 1}`}
          className="w-full h-auto rounded-lg shadow-lg object-contain" // Updated to object-contain to fit the full image
          style={{ maxHeight: "500px" }} // Ensure image height doesn't exceed 500px
        />
      </div>

      {/* Prev and Next buttons */}
      <ArrowButton direction="left" onClick={prevImage} />
      <ArrowButton direction="right" onClick={nextImage} />
    </div>
  );
};

export default ImageSlider;
