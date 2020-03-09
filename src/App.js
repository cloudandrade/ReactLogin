import React from 'react';
import './App.css';
import Login from '../src/pages/login/login';
import Toggle from './ToggleRenderProps';

function App() {
	return (
		<div className="App">
			<Login></Login>
			{/* 	<Toggle
				render={({ on, toggle }) => (
					<div>
						{on && <h1>Show Me</h1>}
						<button onClick={toggle}> Show/Hide</button>
					</div>
				)}
			/> */}
		</div>
	);
}

export default App;
