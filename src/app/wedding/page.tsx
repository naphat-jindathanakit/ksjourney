"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import ImageSlider from "@/components/ImageSlider"; // Import ImageSlider
import SingleImageModal from "@/components/SingleImageModal"; // Import SingleImageModal component
import ImageModal from "@/components/ImageModal"; // Import ImageModal component

const WeddingPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [albumImages, setAlbumImages] = useState<string[]>([]); // Images for modal album
  const [isSingleImageModalOpen, setIsSingleImageModalOpen] = useState(false); // For QR Code Modal and other images
  const [selectedImage, setSelectedImage] = useState<string>(""); // Image selected for SingleImageModal
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // To track the current image in modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // For Full Album Modal

  // QR Code images (different album)
  const qrImages = ["/images/ksQr.jpg"];

  // Regular images (Image 1 and Image 2 album)
  const image1and2 = ["/images/wed-card-1st.jpg", "/images/wed-card-2nd.jpg"];

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    // Fetch the image list from the API route
    const fetchImages = async () => {
      const res = await fetch("/api/get-wedding-images");
      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  // Open Single Image Modal for QR Code or any other image
  const openSingleImageModal = (
    image: string,
    index: number,
    album: string[]
  ) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setAlbumImages(album); // pass the correct album
    setIsSingleImageModalOpen(true);
  };

  // Close Single Image Modal
  const closeSingleImageModal = () => {
    setIsSingleImageModalOpen(false);
  };

  // Handle Next Image
  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % albumImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(albumImages[nextIndex]);
  };

  // Handle Previous Image
  const handlePreviousImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + albumImages.length) % albumImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(albumImages[prevIndex]);
  };

  // Open modal with full album (from slider)
  const openSliderAlbumModal = (image: string, index: number) => {
    openSingleImageModal(image, index, images); // Pass all images to the modal
  };

  // Open the Full Album modal
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  // Close the Full Album modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-sunsetOrange">
      {/* Sidebar */}
      <Sidebar onToggle={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 p-6 ${!isOpen ? "ml-16" : "ml-60"} bg-sunsetOrange`}
      >
        {/* Wedding Page Header */}
        <h1 className="text-4xl font-bold text-sunsetYellow mb-6 text-center">
          Kwang & Suea Wedding
        </h1>

        {/* Invitation Text */}
        <div className="bg-sunsetPink p-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-[#4E3B31] mb-4">
            You're Invited to Our Special Day!
          </h2>
          <p className="text-lg text-[#4E3B31]">
            We are thrilled to share this joyous occasion with you! Join us as
            we celebrate the union of two hearts, bound together by love and
            destiny. Your presence will make this day even more memorable.
          </p>
        </div>

        {/* Image Slider */}
        <div className="w-full max-w-2xl mb-6 mx-auto">
          <ImageSlider
            images={images}
            onImageClick={openSliderAlbumModal} // Pass openSliderAlbumModal to ImageSlider
          />
        </div>

        {/* View Full Album Button */}
        <button
          onClick={openImageModal} // Open the ImageModal when clicked
          className="bg-sunsetYellow text-sunsetOrange px-6 py-3 rounded-lg mb-8 hover:bg-sunsetPeach transition-all duration-300 block mx-auto"
        >
          View Full Album
        </button>

        {/* Two Images horizontally aligned (Responsive) */}
        <div className="flex space-x-4 mb-6 w-full max-w-2xl mx-auto flex-wrap">
          <div className="flex-1 max-w-full sm:max-w-[48%]">
            <img
              src="/images/wed-card-1st.jpg"
              alt="Image 1"
              className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
              onClick={() =>
                openSingleImageModal("/images/wed-card-1st.jpg", 0, image1and2)
              }
            />
          </div>
          <div className="flex-1 max-w-full sm:max-w-[48%]">
            <img
              src="/images/wed-card-2nd.jpg"
              alt="Image 2"
              className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
              onClick={() =>
                openSingleImageModal("/images/wed-card-2nd.jpg", 1, image1and2)
              }
            />
          </div>
        </div>

        {/* QR Code with "Support Us" heading */}
        <div className="bg-sunsetPurple p-8 rounded-lg shadow-md mt-8 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Support Us
          </h2>
          <div className="flex justify-center">
            <img
              src="/images/ksQr.jpg"
              alt="QR Code"
              className="w-auto h-auto max-h-60 object-contain cursor-pointer"
              onClick={() =>
                openSingleImageModal("/images/ksQr.jpg", 0, qrImages)
              }
            />
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div
        className={`bg-sunsetPeach text-white py-4 mt-auto text-center ${
          !isOpen ? "ml-16" : "ml-60"
        }`}
      >
        <p className="text-lg font-semibold">
          Thank you for celebrating with us!
        </p>
      </div>

      {/* Single Image Modal for QR Code, Image1, and Image2 */}
      <SingleImageModal
        isOpen={isSingleImageModalOpen}
        image={selectedImage}
        onClose={closeSingleImageModal}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />

      {/* Image Modal for Full Album */}
      <ImageModal
        isOpen={isImageModalOpen}
        images={images}
        onClose={closeImageModal} // Close function
      />
    </div>
  );
};

export default WeddingPage;
