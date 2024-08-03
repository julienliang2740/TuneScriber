import './App.css';
import '@radix-ui/themes/styles.css';
import Upload from './Home/Upload';

function App() {
  return (
	<div className="App">
		<header className="App-header">
			<div className='m-10'>
				<h1 className='font-inter opacity-75 text-large font-medium mb-2'>The Best Sheet Music Generator</h1>
				<Upload />
			</div>
		</header>
	</div>
  );
}

export default App;
