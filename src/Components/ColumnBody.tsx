import React from "react";
import logo from "../Images/logo512.png";
import '../CSS/ColumnBody.css';

interface Props{
	id?: string;
}

export class ColumnBody extends React.PureComponent<Props>{

	render(){
		return(
			<div className={"mainColumn"}>
				<div style={{marginTop: "5vh", width: "75%"}} className={"fade-in"}>
					<img alt={"scatterbrain logo"} src={logo} width={200}/>
					<div className={"childrenColumn"} id={this.props.id}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
