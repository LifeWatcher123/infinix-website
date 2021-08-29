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
