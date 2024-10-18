import PropTypes from 'prop-types';

const Modal_Video = ({ urlvideo, isModalOpen, handleCloseModal }) => {
  const handleOutsideClick = (e) => {
    // Đóng modal khi nhấp ra ngoài khung video
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={handleOutsideClick}
        >
          <div className="relative aspect-video w-4/5 max-w-5xl">
            <iframe
              className="h-full w-full rounded-lg border border-gray-600 shadow-lg"
              src={urlvideo}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

Modal_Video.propTypes = {
  urlvideo: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default Modal_Video;
