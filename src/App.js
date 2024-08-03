import './App.css';
import '@radix-ui/themes/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Upload from './Home/Upload';
import Result from './Result/Result';

function App() {
  return (
    <Theme appearance="dark">
      <Router>
        <div className="App">
          <header className="App-header">
            <div className='m-10'>
              <Routes>
                <Route path="/upload" element={<Upload />} />
                <Route path="/result" element={<Result />} />
                <Route path="/" element={<Upload />} />
              </Routes>
            </div>
          </header>
        </div>
      </Router>
    </Theme>
  );
}

export default App;