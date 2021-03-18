import { Button, createStyles, fade, MobileStepper, Theme, Typography, withStyles } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

interface Props{
	classes: {[S in keyof ReturnType<typeof componentStyles>]: string};
	posts: JSX.Element[];
	width: number;
}

interface State{
	step: number;
}

class _Highlights extends React.Component<Props, State>{

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

	disableBackButton = () => {
		return this.props.posts.length === 0 || this.state.step === 0;
	}

	disableForwardButton = () => {
		return this.props.posts.length === 0 || this.state.step === this.props.posts.length - 1
	}

	render(){
		const {classes} = this.props;
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
						<Button 
							size="small" 
							onClick={this.stepForward} 
							disabled={this.disableForwardButton()}
							className={classes.enabledButton}
							classes={{disabled: classes.disabledButton}}
						>
							<Typography className={this.disableForwardButton() ? classes.disabledButton : classes.enabledText}>Next</Typography>
							<KeyboardArrowRight className={this.disableForwardButton() ? classes.disabledButton : classes.enabledText}/>
						</Button>
					}
					backButton={
						<Button 
							size="small" 
							onClick={this.stepBackward} 
							disabled={this.disableBackButton()}
							className={classes.enabledButton}
							classes={{disabled: classes.disabledButton}}
						>
							<KeyboardArrowLeft className={this.disableBackButton() ? classes.disabledButton : classes.enabledText}/>
							<Typography className={this.disableBackButton() ? classes.disabledButton : classes.enabledText}>Back</Typography>
						</Button>
					}
				/>
			</div>
		);
	}

}

const componentStyles = (theme: Theme) => createStyles({
	enabledButton: {
		"&:hover": {
			backgroundColor: fade("#FFFFFF", 0.1)
		},
		color: "white"
	},
	enabledText: {
		color: 'white'
	},
	disabledButton: {
		color: "gray"
	}
});

export const Highlights = withStyles(componentStyles, {withTheme: true})(_Highlights);