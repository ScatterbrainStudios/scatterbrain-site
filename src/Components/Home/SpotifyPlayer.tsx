import React from "react";

interface Props{
    width: number | string;
    height?: number | string;
    id: number | string;
    title: string;
    spotifyId: string;
}

export class SpotifyPlayer extends React.PureComponent<Props>{

    render(){
        return(
            <iframe 
                title={this.props.title}
                id={`spotify${this.props.id}`}
                src={"https://open.spotify.com/embed/track/7qZyLOHrN85waG8L6IUAno"}
                width={this.props.width}
                height={this.props.height}
                frameBorder={"0"}
                allowTransparency={true}
                allow="encrypted-media" 
            />
        );
    }
}