import React from "react";
import logo from "../Images/logo512.png";
import '../CSS/ColumnBody.css';

export class ColumnBody extends React.PureComponent{

	render(){
		return(
			<div className={"mainColumn"}>
				<div style={{marginTop: "5vh", width: "75%"}}>
					<img alt={"scatterbrain logo"} src={logo} width={200} className={"fade-in"}/>
					<div className={"childrenColumn"} /*style={{paddingLeft: "25%", paddingRight: "25%", width: "50%", alignItems: "center", display: "flex", flexDirection: "column"}}*/>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
