import {Penrose} from "./Penrose/recurse_sketch"
import React from 'react';
import { ColumnBody } from './Components/ColumnBody';

function App() {
	return (
		<div style={{textAlign: "center"}}>
			<div style={{position: "absolute"}}>
				<Penrose/>
			</div>
			<ColumnBody>
			</ColumnBody>
		</div>
	);
}

export default App;
