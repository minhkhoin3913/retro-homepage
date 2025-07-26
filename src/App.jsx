import Desktop from './components/Desktop';
import './App.css';
import './css/base.css';
import './css/Desktop.css';

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <Desktop />
    </div>
  );
}

export default App;
