import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import '../css/LoadingScreen.css';

const LoadingScreen = ({ progress }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* <img src="/src/assets/images/mac-logo.png" alt="Mac OS Logo" className="mac-logo" /> */}
        <h1>ByteUI</h1>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p>Starting up...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;