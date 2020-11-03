import {Penrose} from "../../Penrose/recurse_sketch"
import React from 'react';
import { ColumnBody } from './ColumnBody';
import { Highlights } from "./Highlights";
import Posting from '../../Postings.json';
import { Post, PostType, stringToPostType } from "../../Models/Post";
import { Typography } from "@material-ui/core";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { YouTubePlayer } from "./YoutubePlayer";
import { ImageHighlight } from "./ImageHighlight";

interface State{
	width: number;
}

export class Home extends React.PureComponent<any, State> {

	private mainColumnId: string;
	private postElements: JSX.Element[];

	constructor(props: any){
		super(props);
		this.mainColumnId = 'childrenColumn';
		this.state = {
			width: this.getWidth()
		}
		this.postElements = [];
	}

	componentDidMount(){
		this.setState({width: this.getWidth()});
	}

	getWidth = () => {
		return document.getElementById(this.mainColumnId)?.clientWidth || 0;
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
	
	render(){
		if(this.postElements.length === 0 || this.state.width === 0){
			const posts = Posting.map(data => {
				let type = stringToPostType(data.source);
				return {
					type,
					title: data.title,
					link_abstraction: data.link_abstraction,
					pure_link: type === PostType.purelink ? data.pure_link : undefined,
					description: data.description
				}
			});
			this.postElements = this.createSubcomponents(posts);
		}
		return (
			<div style={{textAlign: "center"}}>
				<div style={{position: "absolute"}}>
					<Penrose/>
				</div>
				<ColumnBody id={this.mainColumnId}>
					<Highlights 
						posts={this.postElements}
						width={this.state.width}
					/>
				</ColumnBody>
			</div>
		);
	}
}