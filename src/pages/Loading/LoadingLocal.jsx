import GridLoader from 'react-spinners/GridLoader';

const LoadingLocal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <GridLoader size={48} loading color="#ff0000" />
    </div>
  );
};

export default LoadingLocal;
