import './App.css';
import '@radix-ui/themes/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './Home/Upload';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='m-10'>
            <h1 className='font-inter opacity-75 text-large font-medium mb-2'>
              The Best Sheet Music Generator
            </h1>
            <Routes>
              <Route path="/upload" element={<Upload />} />
              <Route path="/" element={<Upload />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;