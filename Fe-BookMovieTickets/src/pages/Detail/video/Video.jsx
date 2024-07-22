import { useState } from "react";

const VideoPopup = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleImageClick = () => {
    setShowVideo(true);
  };
  const handleBackdropClick = () => {
    setShowVideo(false);
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 absolute top-[30%] left-[50%] text-white w-[80px] h-[80px] border-white stroke-gray-400 cursor-pointer"
        onClick={handleImageClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
        />
      </svg>

      <img
        src="./src/assets/hinh13.jpg "
        alt="Thumbnail"
        className="cursor-pointer aspect-[3/1]   w-full"
      />
      {showVideo && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-65 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <iframe
            width="1300px"
            height="570px"
            src="https://www.youtube.com/embed/1ryqp7IVZro?si=baOECov02ZaZm_wE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoPopup;
