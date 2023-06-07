const LoadingBanner = ({ typeOfData }) => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
      }}
    >
      <p className="heading-m">Loading...</p>
      <p className="heading-s">Please wait while we fetch your {typeOfData}.</p>
    </div>
  );
};

export default LoadingBanner;
