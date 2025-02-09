"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import ImageSlider from "@/components/ImageSlider"; // Import ImageSlider
import SingleImageModal from "@/components/SingleImageModal"; // Import SingleImageModal component
import ImageModal from "@/components/ImageModal"; // Import ImageModal component
import CommentCard from "@/components/CommentCard"; // Import the CommentCard component
import { supabase } from "@/app/supabaseClient";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const WeddingPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [albumImages, setAlbumImages] = useState<string[]>([]); // Images for modal album
  const [isSingleImageModalOpen, setIsSingleImageModalOpen] = useState(false); // For QR Code Modal and other images
  const [selectedImage, setSelectedImage] = useState<string>(""); // Image selected for SingleImageModal
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // To track the current image in modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // For Full Album Modal
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false); // State to handle upload status
  const [uploaded, setUploaded] = useState<boolean>(false); // State to handle success status

  // QR Code images (different album)
  const qrImages = ["/images/ksQr.jpg"];

  // Regular images (Image 1 and Image 2 album)
  const image1and2 = ["/images/wed-card-1st.jpg", "/images/wed-card-2nd.jpg"];

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const fetchImages = async () => {
      // Attempt to fetch the list of files in the root folder
      const { data, error } = await supabase.storage
        .from("prewedding")
        .list(""); // Root folder

      if (error) {
        throw error;
      }

      if (data?.length > 0) {
        const imageUrls = data.map((file) => {
          // Check if the public URL is correctly generated for each file
          const publicUrl = supabase.storage
            .from("prewedding")
            .getPublicUrl(file.name).data.publicUrl;
          return publicUrl;
        });
        setImages(imageUrls);
      }
    };

    fetchImages();
  }, []);

  // Example comments data
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setComments(data);
    };

    fetchComments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setUploadError("File size exceeds 2 MB.");
      setFile(null);
      return;
    }

    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setUploadError("Only JPEG or PNG images are allowed.");
      setFile(null);
      return;
    }

    setUploadError("");
    setFile(selectedFile);
    setUploaded(false); // Reset success state when selecting a new file
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploading(true); // Set uploading state to true to show loading icon
    const filePath = `${Date.now()}_${file.name}`;

    const { error: storageError } = await supabase.storage
      .from("payslips")
      .upload(filePath, file);

    if (storageError) {
      setUploadError("Failed to upload the file.");
      console.error(storageError);
      setUploading(false); // Stop loading when an error occurs
      return;
    }

    // Save the file metadata to the database
    const { error: dbError } = await supabase
      .from("payslip_uploads")
      .insert([{ file_path: filePath }]);

    if (dbError) {
      setUploadError("Failed to save file metadata.");
      console.error(dbError);
      setUploading(false); // Stop loading when an error occurs
      return;
    }

    setUploading(false); // Stop loading when upload is successful
    setUploaded(true); // Set success state to true
    alert("Payslip uploaded successfully!");
    setFile(null); // Clear selected file after successful upload
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("comments")
      .insert([{ name, message }]);
    if (error) console.error(error);

    setName("");
    setMessage("");
    window.location.reload(); // Refresh to show new comments
  };

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
        className={`flex-1 p-6 ${
          !isOpen ? "ml-16" : "ml-60"
        } bg-colorfulPastel`}
      >
        {/* Wedding Page Header */}
        <h1 className="text-4xl font-bold text-sunsetYellow mb-6 text-center signature-font">
          Kwang & Suea Wedding
        </h1>

        {/* Invitation Text */}
        <div className="bg-sunsetPink p-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-[#4E3B31] mb-4 js-synjai-font">
            {"You're Invited to Our Special Day!"}
          </h2>
          <p className="text-lg text-[#4E3B31] invitation-text">
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

        {/* QR Code with "Support Us" heading and Upload Payslip Section */}
        <div className="bg-sunsetPurple p-8 rounded-lg shadow-md mt-8 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#4E3B31] mb-4 text-center">
            Support Us
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src="/images/ksQr.jpg"
              alt="QR Code"
              className="w-auto h-auto max-h-60 object-contain cursor-pointer"
              onClick={() =>
                openSingleImageModal("/images/ksQr.jpg", 0, qrImages)
              }
            />
          </div>

          {/* Upload Payslip Section */}
          <div className="bg-sunsetGreen p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#4E3B31] text-center mb-6">
              We Appreciate Your Support! Please Share Your Payslip
            </h2>

            {/* File Upload Section */}
            <div className="my-4 flex items-center">
              <label
                htmlFor="file-upload"
                className="bg-gradient-to-r from-sunsetOrange to-sunsetPeach text-white font-semibold text-lg py-2 px-4 rounded-lg shadow-md cursor-pointer hover:bg-sunsetPeach transition-all"
              >
                Choose File
              </label>

              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Display filename if a file is selected */}
              {file && (
                <span className="ml-4 text-sunsetYellow text-sm font-medium flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </span>
              )}

              {/* Display any upload error */}
              {uploadError && (
                <p className="text-red-600 ml-4">{uploadError}</p>
              )}
            </div>

            {/* Upload Payslip Button */}
            <button
              onClick={handleFileUpload}
              className={`bg-sunsetOrange text-white px-6 py-3 rounded-lg w-full transition-all ${
                !file
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-sunsetPeach"
              } flex items-center justify-center`} // Add flex to make everything align on one line
              disabled={!file}
            >
              Upload Payslip
              {/* Show loading icon or success checkmark next to the button */}
              {uploading && (
                <FaSpinner className="ml-4 animate-spin" /> // Loading spinner icon
              )}
              {uploaded && (
                <FaCheckCircle className="ml-4 text-green-500" /> // Success checkmark
              )}
            </button>
          </div>
        </div>

        {/* Form Section */}
        <section className="my-8 max-w-xl mx-auto bg-sunsetPink p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-[#4E3B31] mb-6">
            Share Your Wishes
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="border p-2 w-full mb-2 rounded-lg"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="border p-2 w-full mb-2 rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-sunsetOrange text-white px-6 py-3 rounded-lg w-full hover:bg-sunsetPeach transition-all"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Display the list of comments as cards */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              name={comment.name}
              message={comment.message}
              date={new Date(comment.created_at).toLocaleDateString()}
            />
          ))}
        </div>
      </div>

      {/* Thank You Message */}
      <div
        className={`bg-sunsetPurple text-[#4E3B31] py-4 mt-auto text-center ${
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
