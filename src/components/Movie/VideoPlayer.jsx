import { useState } from 'react';
import PropTypes from 'prop-types';
import blurLeft from "../../assets/img/blur/blur-left.7a4f1851.png";
import blurRight from "../../assets/img/blur/blur-right.52fdcf99.png";
import Modal_Video from './Modal_Video';

const VideoPlayer = ({ urlvideo, urlvideo_img }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative mb-8 flex h-full w-full justify-center bg-black">
      <div className="absolute z-30 h-full w-full bg-black/30"></div>
      <div className="relative h-full">
        <div className="absolute -left-0 top-0 z-10 hidden lg:block">
          <img
            alt="Blur Left"
            loading="lazy"
            width="342"
            height="680"
            className="w-full object-cover lg:h-[500px]"
            src={blurLeft}
          />
        </div>
        <div className="relative">
          <img
            className="h-full w-[860px] rounded-lg border border-gray-600 object-cover shadow-lg md:h-full lg:h-[500px]"
            src={urlvideo_img}
            alt="Movie Thumbnail"
          />
          <button
            className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
            onClick={handlePlayClick}
          >
            <img
              alt="play"
              loading="lazy"
              width="64"
              height="64"
              className="h-10 w-10 object-cover lg:h-16 lg:w-16"
              src="https://www.galaxycine.vn/_next/static/media/button-play.2f9c0030.png"
            />
          </button>
        </div>
        <div className="absolute -right-0 top-0 z-10 hidden lg:block">
          <img
            alt="Blur Right"
            loading="lazy"
            width="342"
            height="680"
            className="w-full object-cover lg:h-[500px]"
            src={blurRight}
          />
        </div>
      </div>

      {/* Modal hiển thị video YouTube */}
      <Modal_Video 
        urlvideo={urlvideo} 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  urlvideo: PropTypes.string.isRequired,
  urlvideo_img: PropTypes.string.isRequired,
};

export default VideoPlayer;
