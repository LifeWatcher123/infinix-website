export const CoverSpinner = (props) => {
  return (
    <div
      className="collapse show bg-primary-mix-black-20 position-fixed overlay"
      id={props.id}
    >
      <div className="vw-100 vh-100">
        <div className="text-center position-absolute top-50 start-50 translate-middle">
          <h1>Loading</h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PseudoBackground = (props) => {
  return (
    <div
      className="pseudo-background"
      style={{
        backgroundImage:
          `url(${props.backgroundImageUrl})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "top",
        backgroundSize: "cover",
        opacity: props.opacity
      }}
    />
  );
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
