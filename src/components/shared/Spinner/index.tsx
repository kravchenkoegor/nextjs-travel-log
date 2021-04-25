interface Props {
  size?: string;
}

const Spinner: React.FC<Props> = ({ size = '5rem' }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner" style={{ width: size, height: size }}>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Spinner;
