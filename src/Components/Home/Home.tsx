import {Penrose} from "../../penrose/recurse_sketch"
import React from 'react';
import { ColumnBody } from './ColumnBody';
import { Highlights } from "./Highlights";
import Posting from '../../Postings.json';
import { PostType, stringToPostType } from "../../Models/Post";

interface State{
	width: number;
}

export class Home extends React.PureComponent<any, State> {

	private mainColumnId: string;

	constructor(props: any){
		super(props);
		this.mainColumnId = 'childrenColumn';
		this.state = {
			width: this.getWidth()
		}
	}

	componentDidMount(){
		this.setState({width: this.getWidth()});
	}

	getWidth = () => {
		return document.getElementById(this.mainColumnId)?.clientWidth || 0;
	}

	render(){
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

		return (
			<div style={{textAlign: "center"}}>
				<div style={{position: "absolute"}}>
					<Penrose/>
				</div>
				<ColumnBody id={this.mainColumnId}>
					<Highlights 
						posts={posts}
						width={this.state.width}
					/>
				</ColumnBody>
			</div>
		);
	}
}
