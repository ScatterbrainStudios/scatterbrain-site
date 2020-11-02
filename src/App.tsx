import {Penrose} from "./penrose/recurse_sketch"
import React from 'react';
import { ColumnBody } from './Components/ColumnBody';
import { Highlights } from "./Components/Highlights";
import { YouTubePlayer } from "./Components/YoutubePlayer";

interface State{
	width: string | number;
	height: string | number;
}

export class App extends React.PureComponent<any, State> {

	private mainColumnId: string;

	constructor(props: any){
		super(props);
		this.mainColumnId = 'childrenColumn';

		let width = document.getElementById(this.mainColumnId)?.scrollWidth || 0;
		let height = width * (9/16);

		this.state = {
			width,
			height
		}
		
	}

	componentDidMount(){
		let width = document.getElementById(this.mainColumnId)?.scrollWidth || 0;
		let height = width * (9/16);
		this.setState({width, height});
	}

	render(){
		return (
			<div style={{textAlign: "center"}}>
				<div style={{position: "absolute"}}>
					<Penrose/>
				</div>
				<ColumnBody id={this.mainColumnId}>
					<Highlights maxSteps={1}>
						<YouTubePlayer 
							videoId={"a3gcm3gqCLo"}
							title={"Champ Select | It’s About the Magic"}
							width={this.state.width}
							height={this.state.height}
							id={1}
						/>
					</Highlights>
				</ColumnBody>
			</div>
		);
	}
}