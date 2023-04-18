const LoadingBanner = ({typeOfData}) => {
  return (
    <div className="loading-banner">
      <p>Loading...</p>
      <p>Please wait while we fetch your {typeOfData}.</p>
    </div>
  );
};

export default LoadingBanner;
