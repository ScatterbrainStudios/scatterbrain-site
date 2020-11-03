
export enum PostType{
    youtube = 'youtube',
    image = 'image',
    spotify = 'spotify',
    purelink = 'pure link'
}

export function stringToPostType(input: string): PostType{
    switch(input){
        case "youtube": return PostType.youtube;
        case "image": return PostType.image;
        case "spotify": return PostType.spotify;
    }
    return PostType.purelink;
}

export interface Post{
    type: PostType;

    title: string;

    link_abstraction?: string;

    pure_link?: string;

    description: string;
}