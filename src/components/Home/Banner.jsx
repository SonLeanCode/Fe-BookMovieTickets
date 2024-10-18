import PropTypes from 'prop-types';

const Banner = ({ banners, currentBannerIndex }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 h-full w-full transition-transform duration-[800ms] ease-in-out ${
            currentBannerIndex === index ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{
            backgroundImage: `url(${banner.bannerUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ))}
    </div>
  );
};

// Prop validation
Banner.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      seasons: PropTypes.number.isRequired,
      releaseYear: PropTypes.number.isRequired,
      bannerUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentBannerIndex: PropTypes.number.isRequired,
};

export default Banner;
