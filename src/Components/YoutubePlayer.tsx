import React from "react";

interface Props{
    videoId: string;
    title: string;
    width?: number | string;
    height?: number | string;
}

export class YouTubePlayer extends React.PureComponent<Props>{

    private player: any;
    private done: boolean;

    constructor(props: Props){
        super(props);
        this.done = false;
        (window as any).onYouTubeIframeAPIReady = () => {
            this.player = new (window as any).YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: 'YourVideoId',
                playerVars: {'autoplay': 1, 'rel': 0, 'controls': 2},
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        };
    }

    onPlayerReady = (event: any) => {
        event.target.stopVideo();
    }

    onPlayerStateChange = (event: any) => {
        if (event.data == (window as any).YT.PlayerState.PLAYING && !this.done) {
            setTimeout(this.stopVideo, 6000);
            this.done = true;
        }
    }

    stopVideo= () => {
        this.player.stopVideo();
    }

    render(){
        return(
            <iframe 
                title={this.props.title}
                id="player" 
                width={this.props.width || 640}
                height={this.props.height || 390}
                src={`http://www.youtube.com/embed/${this.props.videoId}?enablejsapi=1&origin=http://ScatterbrainStudios.github.io/scatterbrain-site`}
                frameBorder={0}
            />
        );
    }
}