import { Button, MobileStepper } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


interface Props{
	maxSteps: number;
}

interface State{
	step: number;
}

export class Highlights extends React.PureComponent<Props, State>{

	state: State = {
		step: 0
	}

	stepForward = () => {
		let step = (this.state.step + 1) % this.props.maxSteps;
		this.setState({step});
	}

	stepBackward = () => {
		let step = (this.state.step - 1);
		step = step >= 0 ? step : this.props.maxSteps - 1;
		this.setState({step});
	}

	render(){
		return(
			<>
				{this.props.children}
				<MobileStepper
					style={{width: "97%"}}
					steps={this.props.maxSteps}
					variant="dots"
					position="static"
					activeStep={this.state.step}
					nextButton={
						<Button size="small" onClick={this.stepForward} disabled={this.props.maxSteps == 0}>
							Next
							<KeyboardArrowRight />
						</Button>
					}
					backButton={
						<Button size="small" onClick={this.stepBackward} disabled={this.props.maxSteps == 0}>
							<KeyboardArrowLeft />
							Back
						</Button>
					}
				/>
			</>
		);
	}

}
