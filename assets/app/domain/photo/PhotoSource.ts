import { _decorator, Component, Node } from 'cc';

export enum PhotoType {
    Image,
    Video
}

export interface PhotoInfo {
    width: number;
    height: number;
    thumbnail?: {
        process?: string;
        width: number;
        height: number;
    }
}


export class PhotoSource {
    type: PhotoType = PhotoType.Image;
    url: string = '';
    info:PhotoInfo = null;
}
