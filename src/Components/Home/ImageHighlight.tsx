import React from "react";

interface Props{
    height: number | string;
    id: number | string;
    title: string;
    imageName: string;
}

export class ImageHighlight extends React.PureComponent<Props>{

    render(){

        let image = require(`${this.props.imageName}`);

        return(
            <img
                id={`${this.props.id}${this.props.title}`}
                alt={this.props.title}
                src={image}
                height={this.props.height}
            />
        );
    }
}