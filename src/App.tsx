import {Penrose} from "./Penrose/recurse_sketch"
import React from 'react';
import { ColumnBody } from './Components/ColumnBody';
import { Highlights } from "./Components/Highlights";
import { YouTubePlayer } from "./Components/YoutubePlayer";

function App() {
	return (
		<div style={{textAlign: "center"}}>
			<div style={{position: "absolute"}}>
				<Penrose/>
			</div>
			<ColumnBody>
				<Highlights/>
				<YouTubePlayer 
					videoId={"a3gcm3gqCLo"}
					title={"Champ Select | It’s About the Magic"}
				/>
			</ColumnBody>
		</div>
	);
}

export default App;
