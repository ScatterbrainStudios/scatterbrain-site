import {Penrose} from "../../Penrose/Penrose"
import React from 'react';
import { ColumnBody } from './ColumnBody';
import { Highlights } from "./Highlights";
import Posting from '../../Postings.json';
import { Post, PostType, stringToPostType } from "../../Models/Post";
import { Typography } from "@material-ui/core";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { YouTubePlayer } from "./YoutubePlayer";
import { ImageHighlight } from "./ImageHighlight";
import "./CSS/Home.css";
import memoizeOne from "memoize-one";

interface State{
	width: number;
}

export const MAIN_COLUMN_ID = 'childrenColumn';

export class Home extends React.Component<any, State> {

	private postElements: JSX.Element[];

	constructor(props: any){
		super(props);
		this.state = {
			width: this.getWidth()
		}
		this.postElements = [];
	}

	componentDidMount(){
		this.setState({width: this.getWidth()});
	}

	getWidth = () => {
		return document.getElementById(MAIN_COLUMN_ID)?.clientWidth || 0;
	}

	renderYoutubePlayer = (post: Post, id: number) => {

		const height = this.state.width * (9/16);

		if(post.link_abstraction){
			return(
				<YouTubePlayer 
					videoId={post.link_abstraction}
					title={post.title}
					width={this.state.width}
					height={height}
					id={id}
				/>
			);
		}
		return(<Typography>ERROR: VIDEO NOT FOUND</Typography>);
	}

	renderSpotifyPlayer = (post: Post, id: number) => {

		const height = this.state.width * (9/16);

		if(post.link_abstraction){
			return(
				<SpotifyPlayer
					spotifyId={post.link_abstraction}
					title={post.title}
					width={this.state.width}
					height={height}
					id={id}
				/>
			);
		}
		return(<Typography>ERROR: VIDEO NOT FOUND</Typography>);
	}

	renderImage = (post: Post, id: number) => {
		const height = this.state.width * (9/16);

		if(post.link_abstraction){
			return(
				<ImageHighlight
					title={post.title}
					height={height}
					id={id}
					imageName={post.link_abstraction}
				/>
			);
		}
		return(<Typography>ERROR: VIDEO NOT FOUND</Typography>);
	}

	createSubcomponents = (posts: Post[]): JSX.Element[] => {
		return posts.map((post, i) => {
			switch(post.type){
				case PostType.youtube: return this.renderYoutubePlayer(post, i);
				case PostType.spotify: return this.renderSpotifyPlayer(post, i);
				case PostType.image: return this.renderImage(post, i);
			}
			return <Typography>Under Construction</Typography>
		})
	}
	
	sourceList: Post[] = [{
        type: PostType.youtube,
        title: "Champ Select | It’s About the Magic",
        link_abstraction: "a3gcm3gqCLo",
        pure_link: "",
        description: "This is a super cool test video!\nIt's all about league of legends which nobody actually likes besides Miguel.\nThis needs to be removed soon but for now it's included for testing."
    },
    {
        type: PostType.spotify,
        title: "Driving Drunk",
        link_abstraction: "track/7qZyLOHrN85waG8L6IUAno",
        pure_link: "",
        description: "Sorry Chris, I had to try this out"
    }]

	render(){
		const posts = this.sourceList.map(data => {
			let type = stringToPostType(data.type);
			return {
				type,
				title: data.title,
				link_abstraction: data.link_abstraction,
				pure_link: type === PostType.purelink ? data.pure_link : undefined,
				description: data.description
			}
		});
		this.postElements = this.createSubcomponents(posts);
		return (
			<>
				<Penrose/>
				<div style={{textAlign: "center", display: "flex", justifyContent: "center"}}>
					<ColumnBody id={MAIN_COLUMN_ID}>
						<Highlights 
							posts={this.postElements}
							width={this.getWidth()}
						/>
					</ColumnBody>
				</div>
			</>
		);
	}
}
