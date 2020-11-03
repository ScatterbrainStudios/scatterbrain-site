import { Button, MobileStepper, Typography } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Post, PostType } from "../../Models/Post";
import { YouTubePlayer } from "./YoutubePlayer";


interface Props{
	posts: Post[];
	width: number;
}

interface State{
	step: number;
}

export class Highlights extends React.PureComponent<Props, State>{

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


	renderYoutubePlayer = (post: Post, id: number) => {

		const height = this.props.width * (9/16);

		if(post.link_abstraction){
			return(
				<YouTubePlayer 
					videoId={post.link_abstraction}
					title={post.title}
					width={this.props.width}
					height={height}
					id={id}
				/>
			);
		}
		return(<Typography>ERROR: VIDEO NOT FOUND</Typography>);
	}

	createSubcomponents = () => {
		return this.props.posts.map((post, i) => {
			switch(post.type){
				case PostType.youtube: return this.renderYoutubePlayer(post, i);
			}
			return <Typography>Under Construction</Typography>
		})
	}

	render(){
		return(
			<>
				{this.createSubcomponents()}
				<MobileStepper
					style={{width: "97%"}}
					steps={this.props.posts.length}
					variant="dots"
					position="static"
					activeStep={this.state.step}
					nextButton={
						<Button size="small" onClick={this.stepForward} disabled={this.props.posts.length === 0}>
							<Typography>Next</Typography>
							<KeyboardArrowRight />
						</Button>
					}
					backButton={
						<Button size="small" onClick={this.stepBackward} disabled={this.props.posts.length === 0}>
							<KeyboardArrowLeft />
							<Typography>Back</Typography>
						</Button>
					}
				/>
			</>
		);
	}

}
