import PropTypes from 'prop-types';
import BarLoader from 'react-spinners/BarLoader';

function LoadingPage({ loading }) {
  return (
    loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="mt-8 flex flex-col items-center">
          <BarLoader width={200} loading={loading} color="#ff0000" />
        </div>
      </div>
    )
  );
}

LoadingPage.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingPage;
