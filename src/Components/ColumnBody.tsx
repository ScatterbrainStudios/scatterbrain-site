import React from "react";
import logo from "../Images/logo512.png";
import '../CSS/ColumnBody.css';

export class ColumnBody extends React.Component{

	render(){
		return(
			<div className={"mainColumn"}>
				<div style={{marginTop: "5vh"}}>
					<img alt={"scatterbrain logo"} src={logo} width={200} className={"fade-in"}/>
					{this.props.children}
				</div>
			</div>
		);
	}
}
