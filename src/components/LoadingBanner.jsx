const LoadingBanner = ({ typeOfData }) => {
  return (
    <div className="text-center mt-16">
      <p className="text-xl font-bold">Loading...</p>
      <p className="text-lg font-medium">Please wait while we fetch your {typeOfData}.</p>
    </div>
  );
};

export default LoadingBanner;
