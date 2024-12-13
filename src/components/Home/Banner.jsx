import PropTypes from 'prop-types';

const Banner = ({ banners, currentBannerIndex }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {banners?.data?.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 h-full w-full transition-transform duration-[800ms] ease-in-out ${
            currentBannerIndex === index ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{
            backgroundImage: `url(${banner?.img})`,
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
  banners: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        movie_id: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          img: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          release_date: PropTypes.string.isRequired,
          genres: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            })
          ).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
  currentBannerIndex: PropTypes.number.isRequired,
};

export default Banner;
