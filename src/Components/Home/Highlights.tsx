import { Button, MobileStepper, Typography } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

interface Props{
	posts: JSX.Element[];
	width: number;
}

interface State{
	step: number;
}

export class Highlights extends React.Component<Props, State>{

	state: State = {
		step: 0
	}
	
	stepForward = () => {
		let step = (this.state.step + 1) % this.props.posts.length;
		this.setState({step});
	}

	stepBackward = () => {
		let step = (this.state.step - 1);
		step = step >= 0 ? step : this.props.posts.length - 1;
		this.setState({step});
	}

	render(){
		let width = this.props.width;
		let myHeight = (width * (9/16)) + 30;
		return(
			<div style={{width: this.props.width, minHeight: myHeight, alignItems: "end", display: "flex", flexDirection: "column"}}>
				{this.props.posts[this.state.step]}
				<MobileStepper
					style={{width: "97%", backgroundColor: '#333', height: 30}}
					steps={this.props.posts.length}
					variant="dots"
					position="static"
					activeStep={this.state.step}
					nextButton={
						<Button size="small" onClick={this.stepForward} disabled={this.props.posts.length === 0}>
							<Typography style={{color: 'white'}}>Next</Typography>
							<KeyboardArrowRight style={{color: 'white'}}/>
						</Button>
					}
					backButton={
						<Button size="small" onClick={this.stepBackward} disabled={this.props.posts.length === 0}>
							<KeyboardArrowLeft style={{color: 'white'}}/>
							<Typography style={{color: 'white'}}>Back</Typography>
						</Button>
					}
				/>
			</div>
		);
	}

}
