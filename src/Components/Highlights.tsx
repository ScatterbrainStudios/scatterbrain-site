import { Button, MobileStepper } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

interface State{
	step: number;
}

export class Highlights extends React.PureComponent<{}, State>{

	MAX_STEPS = 5;

	state: State = {
		step: 0
	}

	stepForward = () => {
		let step = (this.state.step + 1) % this.MAX_STEPS;
		this.setState({step});
	}

	stepBackward = () => {
		let step = (this.state.step - 1);
		step = step >= 0 ? step : this.MAX_STEPS - 1;
		this.setState({step});
	}

	render(){
		return(
			<>
				
				<MobileStepper
					style={{width: "100%"}}
					steps={this.MAX_STEPS}
					variant="dots"
					position="static"
					activeStep={this.state.step}
					nextButton={
						<Button size="small" onClick={this.stepForward}>
							Next
							<KeyboardArrowRight />
						</Button>
					}
					backButton={
						<Button size="small" onClick={this.stepBackward}>
							<KeyboardArrowLeft />
							Back
						</Button>
					}
				/>
			</>
		);
	}

}
